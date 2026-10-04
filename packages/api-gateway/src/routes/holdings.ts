// ---------------------------------------------------------------------------
// Holdings routes
//
// GET  /api/v1/holdings         — user's holdings enriched with market quotes
// POST /api/v1/wallet/deposit   — simulate a cash deposit
// POST /api/v1/wallet/withdraw  — simulate a cash withdrawal
// GET  /api/v1/wallet/me        — user's wallet summary
// POST /api/v1/watchlist        — add stock to watchlist
// DELETE /api/v1/watchlist/:symbol — remove from watchlist
// GET  /api/v1/watchlist        — get user's watchlist
// ---------------------------------------------------------------------------

import { Router } from "express";
import { prisma } from "@stockx/execution-service";
import { randomUUID } from "crypto";
import { getQuotes, type MarketQuoteData } from "../marketData/provider.js";

export const holdingsRouter = Router();
export const walletRouter   = Router();
export const watchlistRouter = Router();

// ---------------------------------------------------------------------------
// GET /api/v1/holdings?userId=...
// Returns the user's holdings enriched with current market price and P&L.
// ---------------------------------------------------------------------------
holdingsRouter.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId required" });
  }

  try {
    const holdings = await prisma.holding.findMany({
      where:   { userId, quantity: { gt: 0 } },
      include: { stock: true },
      orderBy: { symbol: "asc" },
    });

    if (holdings.length === 0) return res.json([]);

    // Fetch market quotes for all held symbols
    const symbols = holdings.map((h) => h.symbol);
    const quotes  = await getQuotes(symbols);
    const quoteMap = new Map<string, MarketQuoteData>(quotes.map((q) => [q.symbol, q]));

    const result = holdings.map((h) => {
      const qty         = Number(h.quantity);
      const lockedQty   = Number(h.lockedQuantity);
      const avgCost     = Number(h.averageCost);
      const realizedPnl = Number(h.realizedPnl);
      const quote       = quoteMap.get(h.symbol);
      const currentPrice = quote?.price ?? null;

      const invested        = qty * avgCost;
      const currentValue    = currentPrice !== null ? qty * currentPrice : null;
      const unrealizedPnl   = currentValue !== null ? currentValue - invested : null;
      const unrealizedPnlPct =
        invested > 0 && unrealizedPnl !== null
          ? (unrealizedPnl / invested) * 100
          : null;

      return {
        symbol:          h.symbol,
        companyName:     h.stock.companyName,
        sector:          h.stock.sector,
        quantity:        qty,
        lockedQuantity:  lockedQty,
        availableQty:    qty - lockedQty,
        averageCost:      avgCost,
        currentPrice,
        invested,
        currentValue,
        unrealizedPnl,
        unrealizedPnlPct:
          unrealizedPnlPct !== null
            ? parseFloat(unrealizedPnlPct.toFixed(2))
            : null,
        realizedPnl,
        isDelayed: quote?.isDelayed ?? true,
        updatedAt: quote?.updatedAt ?? null,
      };
    });

    return res.json(result);
  } catch (err) {
    console.error("[Holdings] Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/v1/wallet/me?userId=...
// ---------------------------------------------------------------------------
walletRouter.get("/me", async (req, res) => {
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId required" });
  }
  try {
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });
    return res.json({
      balance:       Number(wallet.balance),
      lockedBalance: Number(wallet.lockedBalance),
      availableCash: Number(wallet.balance) - Number(wallet.lockedBalance),
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch wallet" });
  }
});

// ---------------------------------------------------------------------------
// POST /api/v1/wallet/deposit  { userId, amount }
// Adds simulated cash to the wallet and records a DEPOSIT transaction.
// ---------------------------------------------------------------------------
walletRouter.post("/deposit", async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId required" });
  }
  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt <= 0 || amt > 1_000_000) {
    return res.status(400).json({ error: "Amount must be between $0.01 and $1,000,000" });
  }

  try {
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    const newBalance = Number(wallet.balance) + amt;

    await prisma.$transaction([
      prisma.wallet.update({
        where: { userId },
        data:  { balance: newBalance },
      }),
      prisma.transaction.create({
        data: {
          id:           randomUUID(),
          walletId:     userId,
          type:         "CREDIT",
          category:     "DEPOSIT",
          description:  `Deposited $${amt.toFixed(2)}`,
          amount:       amt,
          balanceAfter: newBalance,
        },
      }),
    ]);

    return res.json({ balance: newBalance, deposited: amt });
  } catch (err) {
    console.error("[Wallet] Deposit error:", err);
    return res.status(500).json({ error: "Deposit failed" });
  }
});

// ---------------------------------------------------------------------------
// POST /api/v1/wallet/withdraw  { userId, amount }
// ---------------------------------------------------------------------------
walletRouter.post("/withdraw", async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId required" });
  }
  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    const available = Number(wallet.balance) - Number(wallet.lockedBalance);
    if (amt > available) {
      return res.status(400).json({
        error: `Insufficient available balance. Available: $${available.toFixed(2)}`,
      });
    }

    const newBalance = Number(wallet.balance) - amt;
    await prisma.$transaction([
      prisma.wallet.update({
        where: { userId },
        data:  { balance: newBalance },
      }),
      prisma.transaction.create({
        data: {
          id:           randomUUID(),
          walletId:     userId,
          type:         "DEBIT",
          category:     "WITHDRAWAL",
          description:  `Withdrew $${amt.toFixed(2)}`,
          amount:       amt,
          balanceAfter: newBalance,
        },
      }),
    ]);

    return res.json({ balance: newBalance, withdrawn: amt });
  } catch (err) {
    console.error("[Wallet] Withdraw error:", err);
    return res.status(500).json({ error: "Withdrawal failed" });
  }
});

// GET /api/v1/wallet/transactions?userId=...&page=1&limit=10
walletRouter.get("/transactions", async (req, res) => {
  const { userId, page: pageStr, limit: limitStr } = req.query;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId required" });
  }
  const page  = Math.max(1, parseInt((pageStr  as string) ?? "1",  10));
  const limit = Math.min(50, parseInt((limitStr as string) ?? "10", 10));
  const skip  = (page - 1) * limit;

  try {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where:   { walletId: userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.transaction.count({ where: { walletId: userId } }),
    ]);
    return res.json({
      transactions: transactions.map((t) => ({
        id:          t.id,
        type:        t.type,
        category:    t.category,
        description: t.description,
        amount:      Number(t.amount),
        balanceAfter: Number(t.balanceAfter),
        ticker:      t.ticker,
        quantity:    t.quantity !== null ? Number(t.quantity) : null,
        price:       t.price !== null ? Number(t.price) : null,
        createdAt:   t.createdAt.toISOString(),
      })),
      total,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

watchlistRouter.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId required" });
  }
  try {
    const items = await prisma.watchlist.findMany({
      where:   { userId },
      include: { stock: { include: { quote: true } } },
      orderBy: { createdAt: "desc" },
    });
    return res.json(
      items.map((w) => ({
        symbol:        w.symbol,
        companyName:   w.stock.companyName,
        price:         w.stock.quote ? Number(w.stock.quote.price) : null,
        changePercent: w.stock.quote ? Number(w.stock.quote.changePercent) : null,
        isDelayed:     w.stock.quote?.isDelayed ?? true,
      })),
    );
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

watchlistRouter.post("/", async (req, res) => {
  const { userId, symbol } = req.body;
  if (!userId || !symbol) return res.status(400).json({ error: "userId and symbol required" });
  try {
    await prisma.watchlist.upsert({
      where:  { userId_symbol: { userId, symbol: symbol.toUpperCase() } },
      create: { userId, symbol: symbol.toUpperCase() },
      update: {},
    });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to add to watchlist" });
  }
});

watchlistRouter.delete("/:symbol", async (req, res) => {
  const { userId } = req.body;
  const { symbol } = req.params;
  if (!userId) return res.status(400).json({ error: "userId required" });
  try {
    await prisma.watchlist.deleteMany({
      where: { userId, symbol: symbol.toUpperCase() },
    });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to remove from watchlist" });
  }
});
