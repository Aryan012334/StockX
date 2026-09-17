// ---------------------------------------------------------------------------
// Matcher Service — entry point
//
// CortexCookie queue layout (symbol-specific routing):
//
//   orders:<SYMBOL>_USD:buy   — BUY  orders for a symbol
//   orders:<SYMBOL>_USD:sell  — SELL orders for a symbol
//   exchange:control          — CANCEL, GET_DEPTH, ADD_USER, ON_RAMP
//
// At startup, all active stock symbols are loaded from the DB to build
// the full queue list. New symbols added while the service is running
// require a restart to be picked up (acceptable for this implementation).
//
// BRPOP accepts multiple keys and returns from whichever fires first,
// giving fair, ordered processing across all symbol queues.
// ---------------------------------------------------------------------------

import { config } from "dotenv";
config({ quiet: true });

import { RedisManager }          from "./redisClient.js";
import { Engine }                from "./trade/Engine.js";
import { prisma }                from "@stockx/execution-service";
import {
  buyQueueNameFor,
  sellQueueNameFor,
  EXCHANGE_CONTROL_QUEUE,
} from "@stockx/shared";

async function main() {
  const engine = new Engine();

  // Warm in-memory wallet state from Postgres
  await engine.loadAllWallets();

  const redis = RedisManager.getInstance();

  // -------------------------------------------------------------------------
  // Build the complete queue list from the Stock catalog.
  //
  // Every active stock gets a dedicated BUY and SELL queue.
  // This ensures symbol-specific routing (CortexCookie requirement):
  //   all AAPL orders → orders:AAPL_USD:buy / orders:AAPL_USD:sell
  //   all MSFT orders → orders:MSFT_USD:buy / orders:MSFT_USD:sell
  //
  // The control queue handles everything else (CANCEL, GET_DEPTH, etc.)
  // -------------------------------------------------------------------------
  let symbolQueues: string[] = [];
  try {
    const stocks = await prisma.stock.findMany({
      where:  { status: "ACTIVE" },
      select: { symbol: true, quoteAsset: true },
    });

    symbolQueues = stocks.flatMap((s) => {
      const ticker = `${s.symbol}_${s.quoteAsset}`;
      return [buyQueueNameFor(ticker), sellQueueNameFor(ticker)];
    });

    console.log(`[Matcher] Registered ${stocks.length} stocks → ${symbolQueues.length} symbol queues`);
  } catch (err) {
    console.warn("[Matcher] Could not load stock list from DB — only control queue active:", err);
  }

  const listenQueues = [...symbolQueues, EXCHANGE_CONTROL_QUEUE];

  console.log(`[Matcher] Ready — listening on ${listenQueues.length} queues (${symbolQueues.length} symbol + 1 control)`);

  while (true) {
    const response = await redis.blockingPop(listenQueues, 0);
    if (response) {
      try {
        engine.process(JSON.parse(response.element));
      } catch (err) {
        console.error("[Matcher] Failed to process message:", err);
      }
    }
  }
}

main();
