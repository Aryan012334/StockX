// ---------------------------------------------------------------------------
// Order Service routes
// POST   /api/v1/order        — place a new buy or sell order
// DELETE /api/v1/order        — cancel an open order
// GET    /api/v1/order/open   — get open orders for a user+symbol
// GET    /api/v1/order/history — get persisted order history (from DB)
// ---------------------------------------------------------------------------

import { Router }           from "express";
import { randomUUID }        from "crypto";
import { ExchangeGateway }   from "../exchangeGateway.js";
import { prisma }            from "@stockx/execution-service";
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

  // Parse the base stock symbol for DB persistence.
  // The full market symbol (e.g. "AAPL_USD") is used by the Matcher.
  // The Order table FK references Stock.symbol which is just the base ("AAPL").
  const baseSymbol = symbol.split("_")[0] ?? symbol;

  // -------------------------------------------------------------------------
  // Reserve funds/shares before sending to Matcher (prevents double-spending)
  // -------------------------------------------------------------------------
  try {
    if (side === "buy") {
      const requiredCash = Number(price) * Number(quantity);
      const wallet = await prisma.wallet.findUnique({ where: { userId } });
      if (!wallet) return res.status(400).json({ error: "Wallet not found" });
      const available = Number(wallet.balance) - Number(wallet.lockedBalance);
      if (available < requiredCash) {
        return res.status(400).json({
          error: `Insufficient funds. Required: $${requiredCash.toFixed(2)}, Available: $${available.toFixed(2)}`,
        });
      }
      await prisma.wallet.update({
        where: { userId },
        data:  { lockedBalance: { increment: requiredCash } },
      });
    } else {
      const qty     = Number(quantity);
      const holding = await prisma.holding.findUnique({
        where: { userId_symbol: { userId, symbol: baseSymbol } },
      });
      const available = holding
        ? Number(holding.quantity) - Number(holding.lockedQuantity)
        : 0;
      if (available < qty) {
        return res.status(400).json({
          error: `Insufficient shares. Required: ${qty}, Available: ${available}`,
        });
      }
      if (holding) {
        await prisma.holding.update({
          where: { userId_symbol: { userId, symbol: baseSymbol } },
          data:  { lockedQuantity: { increment: qty } },
        });
      }
    }
  } catch (reserveErr) {
    console.error("[Order] Reservation error:", reserveErr);
    return res.status(500).json({ error: "Failed to reserve funds/shares" });
  }

  // -------------------------------------------------------------------------
  // TRANSACTIONAL OUTBOX — atomic write of Order + OutboxEvent
  //
  // Both writes happen in one PostgreSQL transaction.
  // If either fails, both roll back — no partial state.
  // The OutboxWorker (outboxWorker.ts) reads OutboxEvent and delivers
  // to Redis with retries. This eliminates the dual-write problem:
  //   OLD: DB write succeeds → Redis push fails → order lost forever
  //   NEW: Both in one tx → OutboxWorker retries delivery until Redis confirms
  // -------------------------------------------------------------------------
  const matcherMessage = {
    clientId: randomUUID(), // correlation ID for the response channel
    message: {
      type: CREATE_ORDER,
      data: { symbol, price, quantity, side, userId, orderType, orderId },
    },
  };

  try {
    await prisma.$transaction([
      prisma.order.create({
        data: {
          id:           orderId,
          userId,
          symbol:       baseSymbol,
          side:         side.toUpperCase() as "BUY" | "SELL",
          orderType:    orderType.toUpperCase() as "LIMIT" | "MARKET",
          price:        Number(price),
          quantity:     Number(quantity),
          filledQty:    0,
          remainingQty: Number(quantity),
          status:       "OPEN",
        },
      }),
      prisma.outboxEvent.create({
        data: {
          eventType: CREATE_ORDER,
          payload:   matcherMessage as any,
          status:    "PENDING",
        },
      }),
    ]);
  } catch (dbErr) {
    // Roll back fund reservation on transaction failure
    if (side === "buy") {
      await prisma.wallet.update({
        where: { userId },
        data:  { lockedBalance: { decrement: Number(price) * Number(quantity) } },
      }).catch(() => {});
    } else {
      await prisma.holding.update({
        where: { userId_symbol: { userId, symbol: baseSymbol } },
        data:  { lockedQuantity: { decrement: Number(quantity) } },
      }).catch(() => {});
    }
    console.error("[Order] Atomic write failed:", dbErr);
    return res.status(500).json({ error: "Failed to persist order" });
  }

  // Also send directly via ExchangeGateway for immediate response
  // (OutboxWorker is the reliable fallback if this fails)
  try {
    const response = await ExchangeGateway.getInstance().send({
      type: CREATE_ORDER,
      data: { symbol, price, quantity, side, userId, orderType, orderId },
    });

    if (response.type === "ORDER_PLACED") {
      const exchangeOrderId = response.payload.orderId;
      await prisma.order.update({
        where: { id: orderId },
        data:  { exchangeOrderId },
      }).catch((e) => console.error("[Order] Failed to store exchangeOrderId:", e));

      // Mark outbox event as delivered since direct send succeeded
      await prisma.outboxEvent.updateMany({
        where: {
          eventType: CREATE_ORDER,
          status:    "PENDING",
          payload:   { path: ["message", "data", "orderId"], equals: orderId },
        },
        data: { status: "DELIVERED", processedAt: new Date() },
      }).catch(() => {});
    }

    return res.status(201).json(response.payload);
  } catch (err) {
    // Direct send failed — OutboxWorker will retry delivery
    // Order is already persisted, so return a pending response
    console.warn("[Order] Direct send failed — OutboxWorker will retry:", err);
    await prisma.order.update({
      where: { id: orderId },
      data:  { status: "OPEN" },
    }).catch(() => {});
    return res.status(202).json({
      orderId,
      executedQty:   0,
      remainingQty:  Number(quantity),
      restingOnBook: false,
      fills:         [],
      note: "Order queued — will be processed shortly",
    });
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
    const response = await ExchangeGateway.getInstance().send({
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
    const response = await ExchangeGateway.getInstance().send({
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
      id:              o.id,
      exchangeOrderId: o.exchangeOrderId ?? null,
      userId:          o.userId,
      symbol:          o.symbol,
      side:            o.side.toLowerCase(),
      orderType:       o.orderType.toLowerCase(),
      price:           o.price.toString(),
      quantity:        o.quantity.toString(),
      filledQty:       o.filledQty.toString(),
      remainingQty:    o.remainingQty.toString(),
      status:          o.status,
      createdAt:       o.createdAt.toISOString(),
    }));

    return res.json(serialized);
  } catch (err) {
    console.error("[Order] History fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch order history" });
  }
});
