// ---------------------------------------------------------------------------
// Outbox Worker — Transactional Outbox pattern
//
// Polls the OutboxEvent table for PENDING events and delivers them to Redis.
// This eliminates the dual-write problem:
//
//   BEFORE (broken):
//     1. INSERT Order into DB        ← succeeds
//     2. LPUSH to Redis              ← can fail independently → order lost
//
//   AFTER (fixed):
//     1. INSERT Order + OutboxEvent in ONE atomic $transaction
//     2. This worker reads OutboxEvent and pushes to Redis with retries
//        If Redis is down, events stay PENDING and are retried next poll.
//        No message is ever lost.
//
// Poll interval: 1 second
// Max retries: 5 (then marked FAILED → goes to DLQ concept)
// ---------------------------------------------------------------------------

import { createClient }   from "redis";
import { prisma }          from "./client.js";
import { config }          from "dotenv";

config({ quiet: true });

const REDIS_URL    = process.env.REDIS_URL ?? "redis://redis:6379";
const POLL_MS      = 1_000;
const MAX_RETRIES  = 5;
const BATCH_SIZE   = 50;

// Queue names (must match api-gateway/src/exchangeGateway.ts)
const EXCHANGE_CONTROL_QUEUE = "exchange:control";

function resolveQueue(eventType: string, payload: any): string {
  if (eventType === "CREATE_ORDER") {
    const { symbol, side } = payload.data ?? {};
    if (symbol && side) {
      return `orders:${symbol}:${side}`;
    }
  }
  return EXCHANGE_CONTROL_QUEUE;
}

async function main() {
  const redis = createClient({ url: REDIS_URL });
  redis.on("error", (e) => console.error("[OutboxWorker] Redis error:", e));
  await redis.connect();
  console.log("[OutboxWorker] Started — polling OutboxEvent every 1s");

  while (true) {
    try {
      // Fetch a batch of PENDING events oldest-first
      const events = await prisma.outboxEvent.findMany({
        where:   { status: "PENDING" },
        orderBy: { createdAt: "asc" },
        take:    BATCH_SIZE,
      });

      for (const event of events) {
        try {
          const queue   = resolveQueue(event.eventType, event.payload);
          const message = JSON.stringify(event.payload);

          await redis.lPush(queue, message);

          // Mark as DELIVERED
          await prisma.outboxEvent.update({
            where: { id: event.id },
            data: {
              status:      "DELIVERED",
              processedAt: new Date(),
            },
          });
        } catch (err) {
          const retries = event.retries + 1;
          const failed  = retries >= MAX_RETRIES;

          await prisma.outboxEvent.update({
            where: { id: event.id },
            data: {
              retries,
              status: failed ? "FAILED" : "PENDING",
              error:  err instanceof Error ? err.message : String(err),
            },
          });

          if (failed) {
            console.error(
              `[OutboxWorker] Event ${event.id} (${event.eventType}) failed after ${MAX_RETRIES} retries — marked FAILED (DLQ)`,
            );
          }
        }
      }
    } catch (err) {
      console.error("[OutboxWorker] Poll error:", err);
    }

    await new Promise((r) => setTimeout(r, POLL_MS));
  }
}

main();
