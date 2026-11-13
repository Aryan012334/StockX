-- Transactional Outbox pattern
-- Eliminates the dual-write problem between Order DB and Redis queue.
-- Order + OutboxEvent are written in one atomic transaction.
-- OutboxWorker polls PENDING events and delivers to Redis with retries.

CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'DELIVERED', 'FAILED');

CREATE TABLE "OutboxEvent" (
    "id"          TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "eventType"   TEXT NOT NULL,
    "payload"     JSONB NOT NULL,
    "status"      "OutboxStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "retries"     INTEGER NOT NULL DEFAULT 0,
    "error"       TEXT,
    CONSTRAINT "OutboxEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "OutboxEvent_status_createdAt_idx" ON "OutboxEvent"("status", "createdAt");
