// ---------------------------------------------------------------------------
// StockX — API Gateway entry point
//
// CortexCookie role: single entry point for all client requests.
// Routes:
//   /api/v1/stocks/*       — Stock Service (metadata, listing)
//   /api/v1/market/*       — Market Data Service (quotes, candles, search)
//   /api/v1/price/*        — Price Service (StockX simulated trade prices + SSE)
//   /api/v1/order/*        — Order Service (place, cancel, history)
//   /api/v1/depth          — Live order book depth (from Matcher)
//   /api/v1/trades         — Recent settled trades
//   /api/v1/holdings       — User holdings with P&L
//   /api/v1/wallet/*       — Wallet operations (deposit, withdraw)
//   /api/v1/watchlist      — User watchlist
//   /api/v1/user/init      — Initialise new user in Matcher Service
// ---------------------------------------------------------------------------

import express from "express";
import cors    from "cors";
import { config } from "dotenv";
config({ quiet: true });

import { ExchangeGateway }            from "./exchangeGateway.js";
import { orderRouter }                from "./routes/order.js";
import { depthRouter }                from "./routes/depth.js";
import { tradesRouter }               from "./routes/trades.js";
import { priceRouter }                from "./routes/price.js";
import { stocksRouter }               from "./routes/stocks.js";
import { newUserRouter }              from "./routes/newUser.js";
import { marketRouter }               from "./routes/market.js";
import { holdingsRouter, walletRouter, watchlistRouter } from "./routes/holdings.js";
import { startMarketDataRefreshLoop } from "./marketData/provider.js";

const app  = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

// Connect Exchange Gateway to Redis
await ExchangeGateway.getInstance().connect();

// Start background market data refresh (15-min batch)
startMarketDataRefreshLoop();

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok", service: "api-gateway" }));

// Routes
app.use("/api/v1/stocks",     stocksRouter);
app.use("/api/v1/market",     marketRouter);
app.use("/api/v1/price",      priceRouter);
app.use("/api/v1/order",      orderRouter);
app.use("/api/v1/depth",      depthRouter);
app.use("/api/v1/trades",     tradesRouter);
app.use("/api/v1/holdings",   holdingsRouter);
app.use("/api/v1/wallet",     walletRouter);
app.use("/api/v1/watchlist",  watchlistRouter);
app.use("/api/v1/user/init",  newUserRouter);

app.listen(PORT, () => console.log(`[API Gateway] Listening on port ${PORT}`));
