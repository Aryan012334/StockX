// ---------------------------------------------------------------------------
// Market Data routes — reference prices from external provider
//
// ╔══════════════════════════════════════════════════════════════════════╗
// ║  BOUNDARY: These routes serve REFERENCE market prices only.         ║
// ║                                                                     ║
// ║  The Stock catalog (what can be traded on StockX) is authoritative  ║
// ║  in the Stock table — managed by stock admin routes below.          ║
// ║                                                                     ║
// ║  The external market-data provider (Twelve Data) is ONLY used to:  ║
// ║    • Provide reference/display prices for listed instruments        ║
// ║    • Provide OHLCV candle data for charting                         ║
// ║                                                                     ║
// ║  It does NOT control: listing, trading eligibility, fills, P&L.    ║
// ╚══════════════════════════════════════════════════════════════════════╝
//
// MARKET DATA routes (reference prices):
//   GET /api/v1/market/quotes              — all listed stocks + cached quotes
//   GET /api/v1/market/quotes/:symbol      — single stock reference quote
//   GET /api/v1/market/candles/:symbol     — OHLCV candles for charting
//   GET /api/v1/market/search?q=           — search by name or symbol (DB only)
//
// STOCK ADMIN routes (listing management — StockX catalog):
//   POST   /api/v1/market/admin/list       — list a new stock
//   PATCH  /api/v1/market/admin/:symbol    — update stock metadata
//   DELETE /api/v1/market/admin/:symbol    — delist a stock
// ---------------------------------------------------------------------------

import { Router } from "express";
import { prisma } from "@stockx/execution-service";
import {
  getQuote,
  getHistoricalCandles,
} from "../marketData/provider.js";

export const marketRouter = Router();

// ===========================================================================
// MARKET DATA — reference prices
// ===========================================================================

// ---------------------------------------------------------------------------
// GET /api/v1/market/quotes[?symbol=AAPL]
//
// Primary endpoint for the Markets page.
// Source of truth for LISTING is the Stock table (StockX-owned).
// Reference prices come from MarketQuote cache (external provider).
// ---------------------------------------------------------------------------
marketRouter.get("/quotes", async (req, res) => {
  try {
    const { symbol } = req.query;

    if (symbol && typeof symbol === "string") {
      // Single symbol — try live quote with Redis/DB fallback
      const stock = await prisma.stock.findUnique({
        where:   { symbol: symbol.toUpperCase() },
        include: { quote: true },
      });
      if (!stock) {
        return res.status(404).json({ error: `${symbol} is not listed on StockX` });
      }
      // Attempt a fresh quote (Redis cache → provider → DB)
      const live = await getQuote(stock.symbol);
      return res.json([buildQuoteRow(stock, live ?? stockToNullQuote(stock))]);
    }

    // All listed stocks — reads from StockX Stock catalog first
    const stocks = await prisma.stock.findMany({
      where:   { status: "ACTIVE" },
      include: { quote: true },
      orderBy: { symbol: "asc" },
    });

    // Enrich with DB-cached reference prices (no external call per request)
    const result = stocks.map((s) => buildQuoteRow(s, null));
    return res.json(result);
  } catch (err) {
    console.error("[Market] Quotes error:", err);
    return res.status(500).json({ error: "Failed to fetch market quotes" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/market/quotes/:symbol
// Live reference quote for a single stock (Redis → provider → DB → null).
// ---------------------------------------------------------------------------
marketRouter.get("/quotes/:symbol", async (req, res) => {
  const sym = req.params.symbol.toUpperCase();
  try {
    // Stock must be listed on StockX to have a quote
    const stock = await prisma.stock.findUnique({
      where:   { symbol: sym },
      include: { quote: true },
    });
    if (!stock) {
      return res.status(404).json({ error: `${sym} is not listed on StockX` });
    }
    const live = await getQuote(sym);
    return res.json(buildQuoteRow(stock, live));
  } catch (err) {
    console.error(`[Market] Quote error for ${sym}:`, err);
    return res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/market/candles/:symbol
// Reference OHLCV candles from external provider — for chart display only.
// Query: interval (default "1day"), outputsize (default 90, max 500)
// ---------------------------------------------------------------------------
marketRouter.get("/candles/:symbol", async (req, res) => {
  const sym        = req.params.symbol.toUpperCase();
  const interval   = (req.query.interval as string) ?? "1day";
  const outRaw     = parseInt((req.query.outputsize as string) ?? "90", 10);
  const outputsize = Math.min(isNaN(outRaw) ? 90 : outRaw, 500);

  const VALID = ["1min","5min","15min","30min","1h","4h","1day","1week"];
  if (!VALID.includes(interval)) {
    return res.status(400).json({ error: `Invalid interval. Use: ${VALID.join(", ")}` });
  }

  // Verify the stock is listed on StockX (not just in Twelve Data)
  try {
    const stock = await prisma.stock.findUnique({ where: { symbol: sym } });
    if (!stock) {
      return res.status(404).json({ error: `${sym} is not listed on StockX` });
    }
    const candles = await getHistoricalCandles(sym, interval, outputsize);
    return res.json(candles);
  } catch (err) {
    console.error(`[Market] Candles error for ${sym}:`, err);
    return res.status(500).json({ error: "Failed to fetch candles" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/market/search?q=apple
// Full-text search across StockX-listed stocks only.
// Does NOT call external provider — searches local DB.
// ---------------------------------------------------------------------------
marketRouter.get("/search", async (req, res) => {
  const q = ((req.query.q as string) ?? "").trim();
  if (!q) return res.json([]);

  try {
    const stocks = await prisma.stock.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          { symbol:      { contains: q.toUpperCase() } },
          { companyName: { contains: q, mode: "insensitive" } },
          { sector:      { contains: q, mode: "insensitive" } },
        ],
      },
      include: { quote: true },
      orderBy: { symbol: "asc" },
      take: 20,
    });

    return res.json(
      stocks.map((s) => ({
        symbol:        s.symbol,
        companyName:   s.companyName,
        sector:        s.sector,
        quoteAsset:    s.quoteAsset,
        price:         s.quote ? Number(s.quote.price) : null,
        changePercent: s.quote ? Number(s.quote.changePercent) : null,
        isDelayed:     s.quote?.isDelayed ?? true,
      })),
    );
  } catch (err) {
    console.error("[Market] Search error:", err);
    return res.status(500).json({ error: "Search failed" });
  }
});

// ===========================================================================
// STOCK ADMIN — StockX catalog management
//
// These routes manage which instruments are listed and tradeable on StockX.
// The external market-data provider has NO say in this.
// ===========================================================================

// ---------------------------------------------------------------------------
// POST /api/v1/market/admin/list  { symbol, companyName, sector, quoteAsset }
// List a new stock on StockX.
// ---------------------------------------------------------------------------
marketRouter.post("/admin/list", async (req, res) => {
  const { symbol, companyName, sector, quoteAsset = "USD" } = req.body;
  if (!symbol || !companyName) {
    return res.status(400).json({ error: "symbol and companyName are required" });
  }
  const sym = symbol.toUpperCase().trim();
  try {
    const stock = await prisma.stock.upsert({
      where:  { symbol: sym },
      create: { symbol: sym, companyName, sector, baseAsset: sym, quoteAsset, status: "ACTIVE" },
      update: { companyName, sector, quoteAsset, status: "ACTIVE", updatedAt: new Date() },
    });
    // Ensure a MarketQuote placeholder exists so the join doesn't break
    await prisma.marketQuote.upsert({
      where:  { symbol: sym },
      create: { symbol: sym },
      update: {},
    });
    return res.status(201).json({ success: true, stock });
  } catch (err) {
    console.error("[StockAdmin] List error:", err);
    return res.status(500).json({ error: "Failed to list stock" });
  }
});

// ---------------------------------------------------------------------------
// PATCH /api/v1/market/admin/:symbol  { companyName?, sector?, status? }
// Update stock metadata.
// ---------------------------------------------------------------------------
marketRouter.patch("/admin/:symbol", async (req, res) => {
  const sym = req.params.symbol.toUpperCase();
  const { companyName, sector, status } = req.body;
  try {
    const stock = await prisma.stock.update({
      where: { symbol: sym },
      data: {
        ...(companyName !== undefined && { companyName }),
        ...(sector      !== undefined && { sector }),
        ...(status      !== undefined && { status }),
        updatedAt: new Date(),
      },
    });
    return res.json({ success: true, stock });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update stock" });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/v1/market/admin/:symbol
// Delist a stock — sets status=DELISTED, does not delete the row.
// Existing orders and holdings are preserved.
// ---------------------------------------------------------------------------
marketRouter.delete("/admin/:symbol", async (req, res) => {
  const sym = req.params.symbol.toUpperCase();
  try {
    await prisma.stock.update({
      where: { symbol: sym },
      data:  { status: "DELISTED", updatedAt: new Date() },
    });
    return res.json({ success: true, message: `${sym} delisted` });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delist stock" });
  }
});

// ===========================================================================
// Helpers
// ===========================================================================

function stockToNullQuote(stock: any) {
  return null;
}

function buildQuoteRow(stock: any, live: any) {
  // Prefer live/fresh quote, fall back to DB-cached quote on the stock
  const q = live ?? (stock.quote ? {
    price:         Number(stock.quote.price),
    previousClose: Number(stock.quote.previousClose),
    open:          Number(stock.quote.open),
    dayHigh:       Number(stock.quote.dayHigh),
    dayLow:        Number(stock.quote.dayLow),
    volume:        Number(stock.quote.volume),
    change:        Number(stock.quote.change),
    changePercent: Number(stock.quote.changePercent),
    isDelayed:     stock.quote.isDelayed,
    updatedAt:     stock.quote.updatedAt?.toISOString() ?? null,
  } : null);

  return {
    // StockX catalog fields (authoritative)
    symbol:      stock.symbol,
    companyName: stock.companyName,
    sector:      stock.sector,
    quoteAsset:  stock.quoteAsset,
    status:      stock.status,
    // Reference market data fields (external provider cache)
    price:         q?.price         ?? null,
    previousClose: q?.previousClose ?? null,
    open:          q?.open          ?? null,
    dayHigh:       q?.dayHigh       ?? null,
    dayLow:        q?.dayLow        ?? null,
    volume:        q?.volume        ?? null,
    change:        q?.change        ?? null,
    changePercent: q?.changePercent ?? null,
    isDelayed:     q?.isDelayed     ?? true,
    updatedAt:     q?.updatedAt     ?? null,
  };
}
