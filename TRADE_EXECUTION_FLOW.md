# Trade Execution Flow

This document describes what happens after the Matcher Service detects a match.

---

## Overview

```
Matcher Service
      │
      │  MATCH_CREATED event (via Redis "db_processor" queue)
      │  {
      │    matchId:       "uuid",        ← idempotency key
      │    symbol:        "RIL_INR",
      │    price:         250.00,
      │    quantity:      40,
      │    quoteQuantity: 10000.00,      ← price * quantity
      │    buyerId:       "user-a",
      │    sellerId:      "user-b",
      │    buyOrderId:    "order-uuid-1",
      │    sellOrderId:   "order-uuid-2",
      │    isBuyerMaker:  false,
      │    timestamp:     "2026-09-15T..."
      │  }
      │
      ▼
Execution Service
      │
      │  BEGIN TRANSACTION
      │  ├── INSERT MatchExecution (matchId) ← idempotency check
      │  ├── SELECT Wallet WHERE userId=buyerId  FOR UPDATE
      │  ├── SELECT Wallet WHERE userId=sellerId FOR UPDATE
      │  ├── UPDATE Wallet (buyer:  balance -= 10000, RIL += 40)
      │  ├── UPDATE Wallet (seller: balance += 10000, RIL -= 40)
      │  ├── INSERT Trade (public feed)
      │  ├── INSERT Transaction (buyer  DEBIT)
      │  └── INSERT Transaction (seller CREDIT)
      │  COMMIT
      │
      ▼
PostgreSQL (consistent, durable state)
```

---

## Step 1 — Matcher emits MATCH_CREATED

File: `matcher-service/src/trade/Engine.ts → emitMatchCreatedEvents()`

For each fill in the taker's order:

```typescript
RedisManager.pushToExecutionQueue({
  type: "MATCH_CREATED",
  data: {
    matchId:       fill.matchId,   // randomUUID() per fill
    symbol:        "RIL_INR",
    price:         fill.price,
    quantity:      fill.qty,
    quoteQuantity: fill.qty * fill.price,
    isBuyerMaker:  side === "sell",
    timestamp:     new Date().toISOString(),
    buyerId:       ...,
    sellerId:      ...,
    buyOrderId:    ...,
    sellOrderId:   ...,
  }
})
```

Note: in-memory wallet balances are updated immediately (before DB write). The
Execution Service makes Postgres eventually consistent with the in-memory state.

---

## Step 2 — Execution Service consumes the event

File: `execution-service/src/executionWorker.ts`

```
BRPOP "db_processor" 0
→ JSON.parse(message)
→ message.type === "MATCH_CREATED"
→ handleMatchCreated(data)
```

---

## Step 3 — Idempotency check

```sql
INSERT INTO "MatchExecution" ("matchId", ...) VALUES ($1, ...)
```

If `matchId` already exists, PostgreSQL throws error code `23505`
(unique_violation). The worker catches this, logs "already settled — skipping",
and returns. **No double-settlement is possible.**

---

## Step 4 — Lock wallets

```sql
SELECT balance, "assetsHeld"
FROM "Wallet"
WHERE "userId" = $1
FOR UPDATE
```

Both rows are locked within the transaction to prevent concurrent modifications.

---

## Step 5 — Calculate new balances

```
Buyer:
  newBalance     = currentBalance - quoteQuantity
  assetsHeld[RIL] += quantity

Seller:
  newBalance     = currentBalance + quoteQuantity
  assetsHeld[RIL] -= quantity
```

---

## Step 6 — Atomic writes

All four writes happen inside the same transaction:

```sql
UPDATE "Wallet" SET balance=..., "assetsHeld"=... WHERE "userId"=buyer
UPDATE "Wallet" SET balance=..., "assetsHeld"=... WHERE "userId"=seller
INSERT INTO "Trade" (...)
INSERT INTO "Transaction" (type=DEBIT,  category=ORDER_BUY,  ...)
INSERT INTO "Transaction" (type=CREDIT, category=ORDER_SELL, ...)
```

---

## Step 7 — COMMIT or ROLLBACK

```
COMMIT   → all five writes are durable
ROLLBACK → none of the writes are applied; no partial state
```

On failure, the event is NOT re-queued automatically. The in-memory state in the
Matcher remains correct; only the Postgres mirror is behind. This is acceptable
for a simulation. In production, a dead-letter queue and reconciliation job would
handle persistent failures.

---

## Realtime path (parallel to DB settlement)

While the Execution Service is settling, the Matcher has already published:

```
PUBLISH "trade@RIL_INR" {
  stream: "trade@RIL_INR",
  data:   { e:"trade", t:matchId, p:"250", q:"40", ... }
}

PUBLISH "depth@RIL_INR" {
  stream: "depth@RIL_INR",
  data:   { e:"depth", b:[[...]], a:[[...]] }
}
```

The Realtime Service receives these and fans them out to all subscribed browser
WebSocket connections immediately. The UI shows the trade and updated order book
depth **before** the DB write has committed — this is the correct behavior
(real exchanges work the same way).

---

## Failure modes

| Failure | Outcome |
|---|---|
| Matcher crashes mid-order | Order is already persisted as OPEN in DB; wallet may be inconsistent until Matcher restarts and reloads wallets |
| Execution Service crashes | MATCH_CREATED event remains in Redis queue; replayed when service restarts |
| Duplicate MATCH_CREATED delivered | Idempotency check (unique matchId) prevents double settlement |
| DB transaction fails | ROLLBACK — no partial writes; Matcher in-memory state remains source of truth |
| Matcher timeout (7s) | API Gateway rejects the order; DB row is updated to CANCELLED |
