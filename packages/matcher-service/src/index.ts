// ---------------------------------------------------------------------------
// Matcher Service — entry point
//
// This service:
//   1. Loads all user wallets from PostgreSQL into memory
//   2. Continuously polls the Redis "messages" queue for orders
//   3. Routes each message to the Engine for price-time priority matching
//
// The Engine emits:
//   - MATCH_CREATED events → "db_processor" queue → Execution Service
//   - ORDER_UPDATE events  → "db_processor" queue → Execution Service
//   - depth/trade events   → Redis pub/sub         → Realtime Service
// ---------------------------------------------------------------------------

import { config } from "dotenv";
config({ quiet: true });

import { RedisManager } from "./redisClient.js";
import { Engine } from "./trade/Engine.js";

async function main() {
  const engine = new Engine();

  // Warm the in-memory wallet state from Postgres
  await engine.loadAllWallets();

  const redis = RedisManager.getInstance();
  console.log("[Matcher] Ready — waiting for orders on 'messages' queue...");

  while (true) {
    const response = await redis.blockingPop("messages", 0);
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
