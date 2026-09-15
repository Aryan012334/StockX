// ---------------------------------------------------------------------------
// API Gateway — entry point
//
// CortexCookie role: single entry point for all client requests.
// Routes to:
//   /api/v1/stocks/*   — Stock Service   (metadata, listing)
//   /api/v1/price/*    — Price Service   (tickers, trade history)
//   /api/v1/order/*    — Order Service   (place, cancel, history)
//   /api/v1/depth      — live order book depth (from Matcher Service)
//   /api/v1/trades     — recent settled trades
//   /api/v1/user/init  — initialise new user in Matcher Service
// ---------------------------------------------------------------------------

import express from "express";
import cors    from "cors";
import { config } from "dotenv";
config({ quiet: true });

import { ExchangeGateway } from "./exchangeGateway.js";
import { orderRouter }     from "./routes/order.js";
import { depthRouter }     from "./routes/depth.js";
import { tradesRouter }    from "./routes/trades.js";
import { priceRouter }     from "./routes/price.js";
import { stocksRouter }    from "./routes/stocks.js";
import { newUserRouter }   from "./routes/newUser.js";

const app  = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

// Connect the Exchange Gateway to Redis on startup
await ExchangeGateway.getInstance().connect();

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok", service: "api-gateway" }));

// Routes
app.use("/api/v1/stocks",    stocksRouter);
app.use("/api/v1/price",     priceRouter);
app.use("/api/v1/order",     orderRouter);
app.use("/api/v1/depth",     depthRouter);
app.use("/api/v1/trades",    tradesRouter);
app.use("/api/v1/user/init", newUserRouter);

app.listen(PORT, () => console.log(`[API Gateway] Listening on port ${PORT}`));
