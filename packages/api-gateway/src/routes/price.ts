// ---------------------------------------------------------------------------
// Price Service routes  (CortexCookie: Price Service)
//
// Derives price information from the Trade table.
// No TimescaleDB or candlestick infrastructure required.
//
// GET /api/v1/price/tickers          — 24 h summary for all symbols
// GET /api/v1/price/tickers/:symbol  — 24 h summary for one symbol
// GET /api/v1/price/history/:symbol  — last N trades for sparkline / chart
// GET /api/v1/price/stream/:symbol   — SSE one-way price stream (CortexCookie)
//
// SSE is used for the one-way price streaming flow described in the
// CortexCookie Stock Trading App design. The server subscribes to the
// Redis "trade@SYMBOL" channel (the same channel the Matcher publishes to)
// and forwards each trade event to the browser via SSE text/event-stream.
//
// WebSocket remains for the interactive order-book depth + trade-feed UI.
// SSE is the appropriate choice here because:
//   - price updates are strictly server → client (one-way)
//   - browsers handle SSE reconnection automatically
//   - no subscription management protocol needed on the client side
// ---------------------------------------------------------------------------

import { Router }       from "express";
import { createClient } from "redis";
import { prisma }       from "@stockx/execution-service";

export const priceRouter = Router();

// ---------------------------------------------------------------------------
// GET /api/v1/price/tickers  [?symbol=AAPL_USD]
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

// ---------------------------------------------------------------------------
// GET /api/v1/price/stream/:symbol  — SSE one-way price stream
//
// CortexCookie Stock Trading App design calls for SSE to push real-time
// price updates from the Price Service to clients.
//
// Flow:
//   Matcher publishes trade@SYMBOL to Redis pub/sub
//       → Price Service (this endpoint) subscribes to that channel
//       → Each trade event is forwarded as an SSE "message" event
//       → Browser EventSource receives it without polling
//
// Each SSE event data is a JSON object:
//   { symbol, price, quantity, isBuyerMaker, timestamp }
//
// The connection is kept open until the client disconnects. On disconnect,
// the Redis subscriber is cleanly unsubscribed and closed.
// ---------------------------------------------------------------------------
priceRouter.get("/stream/:symbol", async (req, res) => {
  const { symbol } = req.params;

  // SSE headers
  res.setHeader("Content-Type",  "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection",    "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable Nginx buffering if present
  res.flushHeaders();

  // Send an initial comment to establish the connection and confirm the symbol
  res.write(`: connected to price stream for ${symbol}\n\n`);

  // Create a dedicated Redis subscriber for this SSE connection.
  // Each open SSE connection gets its own subscriber so unsubscribing one
  // client doesn't affect others.
  const REDIS_URL = process.env.REDIS_URL ?? "redis://redis:6379";
  const subscriber = createClient({ url: REDIS_URL });

  try {
    await subscriber.connect();
  } catch (err) {
    console.error("[SSE] Failed to connect to Redis:", err);
    res.write(`event: error\ndata: ${JSON.stringify({ error: "Redis unavailable" })}\n\n`);
    res.end();
    return;
  }

  const channel = `trade@${symbol}`;

  const onMessage = (raw: string) => {
    try {
      const msg = JSON.parse(raw);
      // msg.data has shape { e:"trade", p, q, m, T, s, t }
      const d = msg?.data;
      if (!d) return;

      const payload = {
        symbol:      d.s   as string,
        price:       d.p   as string,
        quantity:    d.q   as string,
        isBuyerMaker: d.m  as boolean,
        timestamp:   d.T   as number,
        matchId:     d.t   as string,
      };

      // SSE format: "data: <json>\n\n"
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    } catch {
      // Ignore malformed messages — don't kill the stream
    }
  };

  await subscriber.subscribe(channel, onMessage);

  // Heartbeat every 30 s to keep the connection alive through proxies / LBs
  const heartbeat = setInterval(() => {
    res.write(`: heartbeat\n\n`);
  }, 30_000);

  // Cleanup when client disconnects
  req.on("close", () => {
    clearInterval(heartbeat);
    subscriber.unsubscribe(channel).catch(() => {});
    subscriber.quit().catch(() => {});
  });
});
