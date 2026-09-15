# StockX — Interview Guide

Quick reference for explaining every architectural decision in a technical interview. Each answer maps directly to what is actually implemented — nothing is overclaimed.

---

## 1. Overall architecture

StockX is a monorepo with two logical systems:

1. **Stock Trading App** — what users interact with. An API Gateway routes to a Stock Service (metadata), Price Service (ticker stats), Order Service (place/cancel/history), and a Realtime Service (WebSocket).
2. **Stock Exchange** — the Matcher Service (in-memory order books, price-time priority) and Execution Service (atomic PostgreSQL settlement).

All inter-service communication uses Redis: a list queue for API Gateway → Matcher requests, and pub/sub channels for Matcher → Realtime Service events. No HTTP between backend services.

---

## 2. Why a separate Stock Service?

The Stock Service owns the list of tradeable instruments (symbol, company name, status). It is read-heavy and rarely changes. Keeping it separate means you can independently scale stock metadata reads without touching the order or matching path.

In this implementation the Stock Service routes live inside the API Gateway process. The separation is logical (distinct routes, distinct DB table), not physical.

---

## 3. Why a separate Order Service?

The Order Service is responsible for accepting, validating, and persisting orders. It must NOT contain matching logic. By writing the Order row to PostgreSQL *before* forwarding to the Matcher, we ensure durability: if the Matcher crashes, the order is not lost.

The Order Service also owns order history — queries come back from Postgres, not from the in-memory engine.

---

## 4. Why does the Exchange Gateway exist?

In the CortexCookie Stock Trading App design, the Exchange Gateway decouples the trading application from the exchange system. Here, that role is fulfilled by the API Gateway's Redis request-reply pattern: it translates HTTP order requests into `CREATE_ORDER` messages, waits for the Matcher's response, and translates it back to HTTP.

---

## 5. Why is the order book in memory?

Matching is a compute-intensive comparison problem, not a database problem. Every incoming order must be compared against potentially thousands of resting orders at nanosecond speed. Writing bids/asks to a database on every order would introduce unacceptable latency. The in-memory book gives O(n) matching per order with no network round-trips.

Durability is handled separately: orders are persisted to Postgres before they enter the book, and match events are written to the execution queue.

---

## 6. Price-time priority

Two rules, applied in order:

1. **Price priority** — a buyer gets the cheapest available ask; a seller gets the highest available bid.
2. **Time priority** — at the same price level, the order that arrived earlier executes first.

Implementation: orders are inserted into the bids/asks arrays in sorted position at insertion time (by price, then by a monotonically increasing sequence number). Matching walks the sorted array from the best price inward, stopping when the price condition fails.

---

## 7. Partial fills

Example:
```
BUY  100 RIL @ 250 (taker)
SELL  40 RIL @ 248 (maker 1) → fills 40
SELL  35 RIL @ 249 (maker 2) → fills 35
→ executedQty = 75, remainingQty = 25, restingOnBook = true
```

Each fill is a separate `Fill` object with its own `matchId`. The taker's order remains in the book with `quantity=100, filled=75`. Maker orders that are fully filled are spliced out of the array.

---

## 8. Why symbol-based routing?

All orders for the same symbol must be processed by one authoritative order book. If two AAPL orders were processed by different matchers simultaneously, they could both claim the same counterparty order, producing inconsistent state.

In this implementation, one in-memory `Engine` process owns all order books. Scaling this to multiple processes would assign each symbol (or a symbol range) to exactly one Matcher shard — all AAPL orders to shard 1, all MSFT orders to shard 2, etc. This is documented as future scaling.

---

## 9. Why is matching separate from execution?

They solve different problems:

- **Matching** is compute-intensive, stateless with respect to the database, and must be fast.
- **Execution** is database-intensive, requires ACID transactions, and handles side effects (wallet updates, trade records, audit logs).

Separating them means the matching path is never blocked waiting for a slow database write. The Matcher emits a `MATCH_CREATED` event; the Execution Service consumes it asynchronously.

---

## 10. Why PostgreSQL for settlement?

Settlement requires ACID guarantees:
- **Atomicity** — debit buyer, credit seller, and record the trade must all succeed or all fail together.
- **Consistency** — no negative balances, no shares created from nothing.
- **Isolation** — `FOR UPDATE` locks prevent two concurrent settlements from reading stale wallet state.
- **Durability** — once committed, the trade is permanent.

Redis is not suitable here because it cannot provide multi-key transactional writes with rollback semantics.

---

## 11. Why are transactions needed?

Without a transaction:

```
UPDATE Wallet buyer   ← succeeds
UPDATE Wallet seller  ← crashes
INSERT Trade          ← never runs
```

This would leave the buyer debited but the seller never credited — money destroyed. A transaction wraps all five writes; if any fails, all are rolled back.

---

## 12. Idempotency

The `MatchExecution` table has a primary key on `matchId`. If the same `MATCH_CREATED` event is delivered twice (Redis `at-least-once` delivery), the second `INSERT` throws a unique constraint violation (PostgreSQL error `23505`). The worker catches this and skips the event without error. No duplicate settlement can occur.

---

## 13. WebSocket vs SSE

- **WebSocket** (used here) — bidirectional. The browser sends `SUBSCRIBE`/`UNSUBSCRIBE` messages to tell the Realtime Service which symbols it cares about. The server sends `trade@` and `depth@` events back. Suitable when the client needs to control its subscriptions.
- **SSE** (Server-Sent Events) — one-way server push. The CortexCookie Stock Trading App design mentions SSE for one-way price streaming. We chose WebSocket because the order book depth update is a stateful, symbol-specific stream that benefits from subscription management.

---

## 14. What happens if the Matcher fails?

- All in-flight `CREATE_ORDER` requests in the Redis queue remain there (Redis list is durable until the client pops it).
- Order rows written to Postgres before the crash remain in `OPEN` status.
- When the Matcher restarts, it reloads all user wallets from Postgres (`loadAllWallets()`).
- It does NOT reload the in-memory order books — existing open orders in the books are lost. This is a known limitation for this implementation.
- In production, you would persist order book state (snapshot) or replay all OPEN orders from the database on restart.

---

## 15. How does matching scale?

Currently one Matcher process owns all symbols. To scale:

1. Assign each symbol (or a hash range of symbols) to one Matcher shard.
2. The API Gateway performs symbol-based routing: `hash(symbol) % numShards` determines which Redis queue to write to.
3. Each shard maintains its own in-memory order books independently.
4. No cross-shard coordination is needed because a match can only occur between orders for the same symbol.

This is **documented as future scaling** — not currently implemented.

---

## 16. Current limitations

1. Matcher restart loses in-memory order books (no snapshot/replay)
2. In-memory wallets are the source of truth; Postgres is eventually consistent
3. No order expiry at end of trading day
4. Single Matcher process (no horizontal scaling)
5. No dead-letter queue for failed execution events
6. No real-time wallet balance push (browser polls every 5 s)

---

## 17. Future improvements

| Improvement | Why |
|---|---|
| Matcher snapshot or order replay on restart | Resilience |
| Symbol sharding across Matcher instances | Horizontal scaling |
| Dead-letter queue for failed settlements | Reliability |
| WebSocket-pushed wallet updates | Lower latency UI |
| End-of-day order expiry | Exchange compliance |
| Order book depth pagination | Performance at scale |

---

## Files most important to understand

| File | Why |
|---|---|
| `matcher-service/src/trade/Orderbook.ts` | Price-time priority, partial fills, depth aggregation |
| `matcher-service/src/trade/Engine.ts` | Fund locking, order lifecycle, match event emission |
| `execution-service/src/executionWorker.ts` | Atomic settlement, idempotency, PostgreSQL transaction |
| `execution-service/prisma/schema.prisma` | Full data model |
| `shared/src/engineProtocol.ts` | API Gateway ↔ Matcher contract |
| `shared/src/dbMessages.ts` | Matcher → Execution Service contract |
| `api-gateway/src/redisClient.ts` | Request-reply pattern |
| `api-gateway/src/routes/order.ts` | Order persistence before forwarding |
| `realtime-service/src/subscriptionManager.ts` | Lazy Redis subscribe, WS fanout |
| `execution-service/prisma/migrations/20260901000000_init/migration.sql` | DB schema as SQL |

---

## What NOT to claim as implemented

- Exactly-once message delivery (Redis gives at-least-once; idempotency handles duplicates)
- High availability (single instance of each service)
- Horizontal scaling (single Matcher owns all symbols)
- Order book persistence across Matcher restarts
- Real-time wallet balance push (polling only)
- Production-grade error handling and alerting
