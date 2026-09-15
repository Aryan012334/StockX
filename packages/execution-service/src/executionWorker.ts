// ---------------------------------------------------------------------------
// Execution Service — Match Execution Worker
//
// CortexCookie responsibilities:
//   - Consume MATCH_CREATED events from Redis "matches" queue
//   - Check idempotency: skip if matchId already processed (unique constraint)
//   - Atomically within a single PostgreSQL transaction:
//       1. Insert MatchExecution record  ← idempotency key
//       2. Lock wallet rows FOR UPDATE
//       3. Debit buyer wallet (balance)
//       4. Credit seller wallet (balance)
//       5. Transfer stock ownership (assetsHeld)
//       6. Insert public Trade record
//       7. Insert Transaction audit records (buyer + seller)
//   - Concurrently consume ORDER_UPDATE events from "order_updates" queue
//   - On any failure: ROLLBACK — no partial state
//
// Queue layout (after surgical refactor):
//   matches       — MATCH_CREATED events only  (settlement path)
//   order_updates — ORDER_UPDATE events only   (order status path)
//
// The two concerns are separated into two independent worker loops running
// in parallel so a slow ORDER_UPDATE never blocks match settlement.
// ---------------------------------------------------------------------------

import { Client }       from "pg";
import { createClient } from "redis";
import { config }       from "dotenv";
import { MATCHES_QUEUE, ORDER_UPDATES_QUEUE } from "@stockx/shared";

config({ quiet: true });

type MatchCreatedData = {
  matchId:       string;
  symbol:        string;
  price:         number;
  quantity:      number;
  quoteQuantity: number;
  isBuyerMaker:  boolean;
  timestamp:     string;
  buyerId:       string;
  sellerId:      string;
  buyOrderId:    string;
  sellOrderId:   string;
};

type OrderUpdateData = {
  orderId:      string;
  executedQty:  number;
  remainingQty: number;
  status:       "OPEN" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED";
  symbol?:      string;
  price?:       string;
  quantity?:    string;
  side?:        "buy" | "sell";
  userId?:      string;
};

// ---------------------------------------------------------------------------
// Main — start two parallel worker loops
// ---------------------------------------------------------------------------

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await pgClient.connect();
  console.log("[Execution] Connected to PostgreSQL");

  const matchesRedis = createClient({ url: process.env.REDIS_URL ?? "redis://redis:6379" });
  const updatesRedis = createClient({ url: process.env.REDIS_URL ?? "redis://redis:6379" });

  await matchesRedis.connect();
  await updatesRedis.connect();
  console.log("[Execution] Connected to Redis — starting workers");
  console.log(`[Execution] Settlement worker  listening on: ${MATCHES_QUEUE}`);
  console.log(`[Execution] Order-update worker listening on: ${ORDER_UPDATES_QUEUE}`);

  // Run both loops concurrently (Promise.all keeps them alive in parallel)
  await Promise.all([
    settlementLoop(matchesRedis),
    orderUpdateLoop(updatesRedis),
  ]);
}

// ---------------------------------------------------------------------------
// Settlement loop — consumes MATCH_CREATED from the dedicated "matches" queue
// ---------------------------------------------------------------------------

async function settlementLoop(redis: ReturnType<typeof createClient>) {
  while (true) {
    try {
      const response = await (redis as any).brPop(MATCHES_QUEUE, 0);
      if (!response) continue;
      const msg = JSON.parse(response.element);
      if (msg.type === "MATCH_CREATED") {
        await handleMatchCreated(msg.data);
      }
    } catch (err) {
      console.error("[Execution] settlementLoop error:", err);
    }
  }
}

// ---------------------------------------------------------------------------
// Order-update loop — consumes ORDER_UPDATE from the "order_updates" queue
// ---------------------------------------------------------------------------

async function orderUpdateLoop(redis: ReturnType<typeof createClient>) {
  while (true) {
    try {
      const response = await (redis as any).brPop(ORDER_UPDATES_QUEUE, 0);
      if (!response) continue;
      const msg = JSON.parse(response.element);
      if (msg.type === "ORDER_UPDATE") {
        await handleOrderUpdate(msg.data);
      }
    } catch (err) {
      console.error("[Execution] orderUpdateLoop error:", err);
    }
  }
}

// ---------------------------------------------------------------------------
// MATCH_CREATED handler
// One atomic transaction per match event.
// The MatchExecution unique primary key (matchId) enforces idempotency:
// a duplicate INSERT will throw a unique-constraint violation, which we
// catch and treat as "already processed — skip".
// ---------------------------------------------------------------------------

async function handleMatchCreated(d: MatchCreatedData) {
  const {
    matchId, symbol, price, quantity, quoteQuantity,
    isBuyerMaker, timestamp, buyerId, sellerId,
    buyOrderId, sellOrderId,
  } = d;

  const [baseAsset] = symbol.split("_");
  if (!baseAsset) {
    console.error(`[Execution] Invalid symbol: ${symbol}`);
    return;
  }

  await pgClient.query("BEGIN");
  try {
    // ------------------------------------------------------------------
    // Idempotency check — attempt to insert MatchExecution first.
    // If the matchId already exists, the unique constraint will throw
    // and we roll back, effectively skipping this duplicate event.
    // ------------------------------------------------------------------
    await pgClient.query(
      `INSERT INTO "MatchExecution"
         ("matchId","buyOrderId","sellOrderId","symbol","price","quantity",
          "quoteQuantity","buyerId","sellerId","isBuyerMaker","status","settledAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'SETTLED',NOW())`,
      [matchId, buyOrderId, sellOrderId, symbol, price, quantity,
       quoteQuantity, buyerId, sellerId, isBuyerMaker],
    );

    // ------------------------------------------------------------------
    // Lock wallet rows to prevent concurrent settlement races
    // ------------------------------------------------------------------
    const buyerRes = await pgClient.query(
      `SELECT balance, "assetsHeld" FROM "Wallet" WHERE "userId" = $1 FOR UPDATE`,
      [buyerId],
    );
    const sellerRes = await pgClient.query(
      `SELECT balance, "assetsHeld" FROM "Wallet" WHERE "userId" = $1 FOR UPDATE`,
      [sellerId],
    );

    if (!buyerRes.rows.length || !sellerRes.rows.length) {
      throw new Error(`Wallet not found — buyer: ${buyerId}, seller: ${sellerId}`);
    }

    const buyerWallet  = buyerRes.rows[0];
    const sellerWallet = sellerRes.rows[0];

    // Parse assetsHeld — Postgres may return it as a plain object or a JSON string
    const buyerAssets: Record<string, number> =
      typeof buyerWallet.assetsHeld === "string"
        ? JSON.parse(buyerWallet.assetsHeld)
        : (buyerWallet.assetsHeld ?? {});

    const sellerAssets: Record<string, number> =
      typeof sellerWallet.assetsHeld === "string"
        ? JSON.parse(sellerWallet.assetsHeld)
        : (sellerWallet.assetsHeld ?? {});

    // ------------------------------------------------------------------
    // Calculate new balances
    // Buyer: pays quoteQuantity INR, receives quantity baseAsset
    // Seller: receives quoteQuantity INR, delivers quantity baseAsset
    // ------------------------------------------------------------------
    const newBuyerBalance  = Number(buyerWallet.balance) - quoteQuantity;
    const newSellerBalance = Number(sellerWallet.balance) + quoteQuantity;

    buyerAssets[baseAsset]  = (buyerAssets[baseAsset]  ?? 0) + quantity;
    sellerAssets[baseAsset] = (sellerAssets[baseAsset] ?? 0) - quantity;

    // ------------------------------------------------------------------
    // Atomically update both wallets
    // ------------------------------------------------------------------
    await pgClient.query(
      `UPDATE "Wallet" SET balance=$1, "assetsHeld"=$2, "updatedAt"=NOW() WHERE "userId"=$3`,
      [newBuyerBalance, JSON.stringify(buyerAssets), buyerId],
    );
    await pgClient.query(
      `UPDATE "Wallet" SET balance=$1, "assetsHeld"=$2, "updatedAt"=NOW() WHERE "userId"=$3`,
      [newSellerBalance, JSON.stringify(sellerAssets), sellerId],
    );

    // ------------------------------------------------------------------
    // Insert public Trade record
    // ------------------------------------------------------------------
    await pgClient.query(
      `INSERT INTO "Trade" (id, symbol, price, quantity, "quoteQuantity", "isBuyerMaker", timestamp)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [matchId, symbol, price, quantity, quoteQuantity, isBuyerMaker, new Date(timestamp)],
    );

    // ------------------------------------------------------------------
    // Insert Transaction audit records
    // ------------------------------------------------------------------
    await pgClient.query(
      `INSERT INTO "Transaction"
         (id, "walletId", type, category, description, amount, "balanceAfter",
          ticker, quantity, price, "createdAt")
       VALUES ($1,$2,'DEBIT'::"TransactionType",'ORDER_BUY'::"TransactionCategory",
               $3,$4,$5,$6,$7,$8,NOW())`,
      [
        `tx_buy_${matchId}`, buyerId,
        `Bought ${quantity} ${baseAsset} @ ₹${price}`,
        quoteQuantity, newBuyerBalance,
        baseAsset, quantity, price,
      ],
    );
    await pgClient.query(
      `INSERT INTO "Transaction"
         (id, "walletId", type, category, description, amount, "balanceAfter",
          ticker, quantity, price, "createdAt")
       VALUES ($1,$2,'CREDIT'::"TransactionType",'ORDER_SELL'::"TransactionCategory",
               $3,$4,$5,$6,$7,$8,NOW())`,
      [
        `tx_sell_${matchId}`, sellerId,
        `Sold ${quantity} ${baseAsset} @ ₹${price}`,
        quoteQuantity, newSellerBalance,
        baseAsset, quantity, price,
      ],
    );

    await pgClient.query("COMMIT");
    console.log(`[Execution] Settled match ${matchId} — ${quantity} ${symbol} @ ${price}`);
  } catch (err: any) {
    await pgClient.query("ROLLBACK");

    // Unique-constraint violation → duplicate matchId → already settled
    if (err?.code === "23505") {
      console.log(`[Execution] Match ${matchId} already settled — skipping (idempotent)`);
    } else {
      console.error(`[Execution] Settlement failed for match ${matchId}:`, err);
    }
  }
}

// ---------------------------------------------------------------------------
// ORDER_UPDATE handler
// Persists order status changes to the Order table.
// These are best-effort: settlement correctness does NOT depend on them.
// ---------------------------------------------------------------------------

async function handleOrderUpdate(d: OrderUpdateData) {
  try {
    await pgClient.query(
      `UPDATE "Order"
          SET "filledQty"    = "filledQty" + $1,
              "remainingQty" = GREATEST("remainingQty" - $1, 0),
              status         = $2::"OrderStatus",
              "updatedAt"    = NOW()
        WHERE id = $3`,
      [d.executedQty, d.status, d.orderId],
    );
  } catch (err) {
    // Non-critical — the order row may not exist yet (race with creation)
    console.error(`[Execution] ORDER_UPDATE failed for order ${d.orderId}:`, err);
  }
}

main();
