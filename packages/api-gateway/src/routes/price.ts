// ---------------------------------------------------------------------------
// Price Service routes  (CortexCookie: Price Service)
//
// Derives price information from the Trade table.
// No TimescaleDB or candlestick infrastructure required.
//
// GET /api/v1/price/tickers          — 24 h summary for all symbols
// GET /api/v1/price/tickers/:symbol  — 24 h summary for one symbol
// GET /api/v1/price/history/:symbol  — last N trades for sparkline / chart
// ---------------------------------------------------------------------------

import { Router } from "express";
import { prisma } from "@stockx/execution-service";

export const priceRouter = Router();

// ---------------------------------------------------------------------------
// GET /api/v1/price/tickers  [?symbol=RIL_INR]
// Returns: { symbol, lastPrice, firstPrice, high, low, volume,
//            priceChange, priceChangePercent }
// Computes everything from the Trade table — no materialised views.
// ---------------------------------------------------------------------------
priceRouter.get("/tickers", async (req, res) => {
  try {
    const { symbol } = req.query;
    const since = new Date(Date.now() - 24 * 60 * 60 * 1_000);

    if (symbol && typeof symbol === "string") {
      const row = await buildTicker(symbol, since);
      return res.json(row ? [row] : []);
    }

    // Fetch tickers for every active stock
    const stocks = await prisma.stock.findMany({ where: { status: "ACTIVE" } });
    const tickers = await Promise.all(
      stocks.map((s) => buildTicker(`${s.symbol}_${s.quoteAsset}`, since)),
    );
    return res.json(tickers.filter(Boolean));
  } catch (err) {
    console.error("[Price] Tickers error:", err);
    return res.status(500).json({ error: "Failed to fetch tickers" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/price/tickers/:symbol
// ---------------------------------------------------------------------------
priceRouter.get("/tickers/:symbol", async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1_000);
    const row = await buildTicker(req.params.symbol, since);
    if (!row) return res.status(404).json({ error: "No trade data for this symbol" });
    return res.json(row);
  } catch (err) {
    console.error("[Price] Ticker error:", err);
    return res.status(500).json({ error: "Failed to fetch ticker" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/price/history/:symbol?limit=50
// Returns last N trades — used by the frontend sparkline / trade feed.
// ---------------------------------------------------------------------------
priceRouter.get("/history/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const limit = Math.min(parseInt((req.query.limit as string) ?? "50", 10) || 50, 500);

  try {
    const trades = await prisma.trade.findMany({
      where:   { symbol },
      orderBy: { timestamp: "desc" },
      take:    limit,
    });

    return res.json(
      trades.map((t) => ({
        id:            t.id,
        symbol:        t.symbol,
        price:         t.price.toString(),
        quantity:      t.quantity.toString(),
        quoteQuantity: t.quoteQuantity.toString(),
        isBuyerMaker:  t.isBuyerMaker,
        timestamp:     t.timestamp.getTime(),
      })),
    );
  } catch (err) {
    console.error("[Price] History error:", err);
    return res.status(500).json({ error: "Failed to fetch trade history" });
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function buildTicker(symbol: string, since: Date) {
  const trades = await prisma.trade.findMany({
    where:   { symbol, timestamp: { gte: since } },
    orderBy: { timestamp: "asc" },
  });

  if (trades.length === 0) {
    // Return a zero-state ticker so the frontend doesn't crash
    return {
      symbol,
      lastPrice:          "0",
      firstPrice:         "0",
      high:               "0",
      low:                "0",
      volume:             "0",
      priceChange:        "0",
      priceChangePercent: "0.00",
    };
  }

  const prices    = trades.map((t) => Number(t.price));
  const firstPrice = prices[0]!;
  const lastPrice  = prices[prices.length - 1]!;
  const high       = Math.max(...prices);
  const low        = Math.min(...prices);
  const volume     = trades.reduce((s, t) => s + Number(t.quantity), 0);
  const change     = lastPrice - firstPrice;
  const changePct  = firstPrice > 0 ? (change / firstPrice) * 100 : 0;

  return {
    symbol,
    lastPrice:          lastPrice.toString(),
    firstPrice:         firstPrice.toString(),
    high:               high.toString(),
    low:                low.toString(),
    volume:             volume.toString(),
    priceChange:        change.toFixed(2),
    priceChangePercent: changePct.toFixed(2),
  };
}
