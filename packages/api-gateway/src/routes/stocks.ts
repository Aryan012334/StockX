// ---------------------------------------------------------------------------
// Stock Service routes  (CortexCookie: Stock Service)
// GET /api/v1/stocks         — list all active stocks
// GET /api/v1/stocks/:symbol — get a single stock's metadata
// ---------------------------------------------------------------------------

import { Router } from "express";
import { prisma } from "@stockx/execution-service";

export const stocksRouter = Router();

stocksRouter.get("/", async (_req, res) => {
  try {
    const stocks = await prisma.stock.findMany({
      where:   { status: "ACTIVE" },
      orderBy: { symbol: "asc" },
    });
    return res.json(stocks);
  } catch (err) {
    console.error("[Stocks] List error:", err);
    return res.status(500).json({ error: "Failed to fetch stocks" });
  }
});

stocksRouter.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const stock = await prisma.stock.findUnique({ where: { symbol } });
    if (!stock) return res.status(404).json({ error: `Stock ${symbol} not found` });
    return res.json(stock);
  } catch (err) {
    console.error("[Stocks] Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch stock" });
  }
});
