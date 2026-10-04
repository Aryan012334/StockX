// GET /api/v1/trades?symbol=RIL_INR&limit=50
// Returns recent settled trades from the database.

import { Router } from "express";
import { prisma } from "@stockx/execution-service";

export const tradesRouter = Router();

tradesRouter.get("/", async (req, res) => {
  const { symbol, limit } = req.query;
  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "symbol query param required" });
  }

  const tradeLimit = Math.min(parseInt((limit as string) ?? "50", 10) || 50, 500);

  try {
    const trades = await prisma.trade.findMany({
      where:   { symbol },
      orderBy: { timestamp: "desc" },
      take:    tradeLimit,
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
    console.error("[Trades] Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch trades" });
  }
});
