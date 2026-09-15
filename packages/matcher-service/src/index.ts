// ---------------------------------------------------------------------------
// Matcher Service — entry point
//
// CortexCookie queue layout (symbol-specific routing):
//
//   orders:RIL_INR:buy   — BUY  orders for RIL
//   orders:RIL_INR:sell  — SELL orders for RIL
//   orders:TATA_INR:buy  — BUY  orders for TATA
//   ... (one pair per supported symbol)
//   exchange:control     — CANCEL, GET_DEPTH, ADD_USER, ON_RAMP
//
// The Matcher pops from ALL queues simultaneously using BRPOP with a list.
// BRPOP is fair-weighted: it processes whichever queue has a message first.
// All orders for the same symbol still route to the same in-memory order
// book because the Engine is a single process — this satisfies the
// CortexCookie requirement of deterministic per-symbol processing.
//
// Outbound:
//   matches        — MATCH_CREATED events → Execution Service
//   order_updates  — ORDER_UPDATE events  → Execution Service
//   trade@SYMBOL   — pub/sub              → Realtime Service
//   depth@SYMBOL   — pub/sub              → Realtime Service
// ---------------------------------------------------------------------------

import { config } from "dotenv";
config({ quiet: true });

import { RedisManager } from "./redisClient.js";
import { Engine }       from "./trade/Engine.js";
import {
  allSymbolQueues,
  EXCHANGE_CONTROL_QUEUE,
} from "@stockx/shared";

async function main() {
  const engine = new Engine();

  // Warm in-memory wallet state from Postgres
  await engine.loadAllWallets();

  const redis = RedisManager.getInstance();

  // Build the complete list of queues to listen on:
  //   one BUY + one SELL queue per symbol, plus the control queue
  const symbolQueues  = allSymbolQueues();          // ["orders:RIL_INR:buy", "orders:RIL_INR:sell", ...]
  const listenQueues  = [...symbolQueues, EXCHANGE_CONTROL_QUEUE];

  console.log("[Matcher] Ready — listening on queues:", listenQueues.join(", "));

  while (true) {
    // BRPOP accepts multiple keys and returns from whichever fires first.
    // This gives us fair, ordered processing across all symbol queues.
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
