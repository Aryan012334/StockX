// ---------------------------------------------------------------------------
// Order Service routes
// POST   /api/v1/order        — place a new buy or sell order
// DELETE /api/v1/order        — cancel an open order
// GET    /api/v1/order/open   — get open orders for a user+symbol
// GET    /api/v1/order/history — get persisted order history (from DB)
// ---------------------------------------------------------------------------

import { Router }       from "express";
import { randomUUID }   from "crypto";
import { EngineClient } from "../redisClient.js";
import { prisma }       from "@stockx/execution-service";
import {
  CREATE_ORDER,
  CANCEL_ORDER,
  GET_OPEN_ORDERS,
} from "@stockx/shared";
import {
  createOrderSchema,
  cancelOrderSchema,
  getOpenOrdersSchema,
} from "../schema/orderSchema.js";

export const orderRouter = Router();

// ---------------------------------------------------------------------------
// POST /api/v1/order — place order
// The api-gateway generates the orderId here so it can:
//   1. Persist a pending Order row in the DB immediately (durable)
//   2. Forward the same orderId to the Matcher Service
// ---------------------------------------------------------------------------
orderRouter.post("/", async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid order input", details: parsed.error.issues });
  }

  const { userId, symbol, price, quantity, side, orderType } = parsed.data;
  const orderId = randomUUID();

  // Persist order as OPEN before sending to matcher — ensures durability
  try {
    await prisma.order.create({
      data: {
        id:           orderId,
        userId,
        symbol,
        side:         side.toUpperCase() as "BUY" | "SELL",
        orderType:    orderType.toUpperCase() as "LIMIT" | "MARKET",
        price:        Number(price),
        quantity:     Number(quantity),
        filledQty:    0,
        remainingQty: Number(quantity),
        status:       "OPEN",
      },
    });
  } catch (dbErr) {
    console.error("[Order] Failed to persist order:", dbErr);
    return res.status(500).json({ error: "Failed to persist order" });
  }

  // Forward to Matcher Service
  try {
    const response = await EngineClient.getInstance().sendRequest({
      type: CREATE_ORDER,
      data: { symbol, price, quantity, side, userId, orderType, orderId },
    });
    return res.status(201).json(response.payload);
  } catch (err) {
    // Matcher failed — mark the order cancelled so the DB stays consistent
    await prisma.order.update({
      where: { id: orderId },
      data:  { status: "CANCELLED" },
    }).catch(() => {});
    console.error("[Order] Matcher error:", err);
    return res.status(500).json({ error: "Matcher Service error" });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/v1/order — cancel order
// ---------------------------------------------------------------------------
orderRouter.delete("/", async (req, res) => {
  const parsed = cancelOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid cancel request", details: parsed.error.flatten() });
  }

  try {
    const response = await EngineClient.getInstance().sendRequest({
      type: CANCEL_ORDER,
      data: parsed.data,
    });
    return res.json(response.payload);
  } catch {
    return res.status(500).json({ error: "Matcher Service error" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/order/open — open orders (live, from in-memory order book)
// ---------------------------------------------------------------------------
orderRouter.get("/open", async (req, res) => {
  const parsed = getOpenOrdersSchema.safeParse({
    userId: req.query.userId,
    symbol: req.query.symbol,
  });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query params", details: parsed.error.flatten() });
  }

  try {
    const response = await EngineClient.getInstance().sendRequest({
      type: GET_OPEN_ORDERS,
      data: parsed.data,
    });
    return res.json(response.payload);
  } catch {
    return res.status(500).json({ error: "Matcher Service error" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/order/history — order history from DB
// ---------------------------------------------------------------------------
orderRouter.get("/history", async (req, res) => {
  const { userId, symbol, limit } = req.query;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
        ...(symbol && typeof symbol === "string" ? { symbol } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: Math.min(parseInt((limit as string) ?? "50", 10) || 50, 200),
    });

    const serialized = orders.map((o) => ({
      id:           o.id,
      userId:       o.userId,
      symbol:       o.symbol,
      side:         o.side.toLowerCase(),
      orderType:    o.orderType.toLowerCase(),
      price:        o.price.toString(),
      quantity:     o.quantity.toString(),
      filledQty:    o.filledQty.toString(),
      remainingQty: o.remainingQty.toString(),
      status:       o.status,
      createdAt:    o.createdAt.toISOString(),
    }));

    return res.json(serialized);
  } catch (err) {
    console.error("[Order] History fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch order history" });
  }
});
