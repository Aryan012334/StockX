# StockX — Real-Time Stock Trading Simulation Platform

> A full-stack stock exchange simulator with a live in-memory matching engine, atomic settlement, real-time WebSocket order book, and production-grade reliability patterns — built to demonstrate how real electronic exchanges work.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Architecture](#architecture)
- [Full Request Flow](#full-request-flow)
- [Order Lifecycle](#order-lifecycle)
- [Services](#services)
- [Production Patterns Implemented](#production-patterns-implemented)
- [Technology Stack](#technology-stack)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## Overview

StockX simulates a real stock exchange end-to-end. Users receive **$50,000 in virtual capital** and seed stock allocations (10 AAPL, 10 MSFT, 10 NVDA) on signup. They can trade any of **153 US equities** with live reference prices from Twelve Data.

What makes this different from a typical CRUD project:

- **Real matching engine** — price-time priority, partial fills, multi-user order matching
- **Symbol-specific queues** — AAPL orders never interfere with MSFT orders
- **Atomic settlement** — `BEGIN/COMMIT` PostgreSQL transactions, no partial state
- **Idempotent execution** — duplicate match events silently skipped via unique `matchId`
- **Transactional Outbox** — Order + event written atomically, no dual-write problem
- **Order book recovery** — matcher replays all OPEN orders from DB on restart
- **Dead Letter Queue** — failed settlements never silently lost
- **Order expiry** — all open orders marked EXPIRED at 4PM ET daily

---

## Live Demo

```
http://localhost:13000
```

**Demo flow — two accounts, one match:**

| Step | Action | Where to see it |
|---|---|---|
| 1 | Sign up as Alice | `/signup` |
| 2 | Sign up as Bob (Incognito) | `/signup` |
| 3 | Alice: BUY 5 AAPL LIMIT @ $337 | `/trade/AAPL_USD` |
| 4 | Bob: SELL 5 AAPL LIMIT @ $337 | `/trade/AAPL_USD` |
| 5 | Instant match fires | Trade feed updates live |
| 6 | Both portfolios update | `/user/portfolio` |
| 7 | Alice's cash decreases by $1,685 | `/user/wallet` |
| 8 | Bob's AAPL decreases by 5 | `/user/portfolio` |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER CLIENT                              │
│                                                                     │
│   Next.js 16 · React 19 · Tailwind · lightweight-charts            │
│   WebSocket (order book) · SSE (price stream) · REST (orders)      │
└──────────────────┬────────────────────────────┬────────────────────┘
                   │ HTTP REST                   │ WebSocket
                   ▼                             ▼
┌──────────────────────────────┐   ┌─────────────────────────────────┐
│        API GATEWAY           │   │      REALTIME SERVICE           │
│        :3001                 │   │      :3002                      │
│                              │   │                                 │
│  Stock Service   /stocks     │   │  Redis Pub/Sub → WS fanout     │
│  Price Service   /market     │   │  trade@SYMBOL                  │
│  Order Service   /order      │   │  depth@SYMBOL                  │
│  Holdings        /holdings   │   │                                 │
│  Wallet          /wallet     │   │  Lazy subscribe — only when     │
│  Watchlist       /watchlist  │   │  a client is interested         │
│  DLQ inspect     /admin/dlq  │   └─────────────────────────────────┘
│                              │               ▲
│  Exchange Gateway            │               │ PUBLISH
│  resolveQueue(symbol, side)  │   ┌───────────┴─────────────────────┐
│                              │   │        MATCHER SERVICE          │
└──────┬───────────────────────┘   │        (no HTTP port)           │
       │                           │                                 │
       │ ① ATOMIC TX               │  307 Redis queues               │
       │  INSERT Order             │  orders:AAPL_USD:buy            │
       │  INSERT OutboxEvent       │  orders:AAPL_USD:sell           │
       │                           │  orders:MSFT_USD:buy  ...       │
       ▼                           │  exchange:control               │
┌──────────────┐                   │                                 │
│  PostgreSQL  │◄──────────────────│  In-memory order books          │
│              │  OPEN orders      │  Price-time priority            │
│  Order       │  on startup  ②   │  Partial fills                  │
│  OutboxEvent │                   │  Market orders                  │
│  Holding     │                   │                                 │
│  Wallet      │      ③ MATCH     │  → MATCH_CREATED → matches      │
│  Trade       │      ORDER_UPDATE │  → ORDER_UPDATE → order_updates │
│  MatchExec   │                   └─────────────────────────────────┘
│  Transaction │
└──────┬───────┘           ┌────────────────────────────────────────┐
       │                   │       OUTBOX WORKER                    │
       │◄──────────────────│  Polls OutboxEvent every 1s            │
       │  ④ OutboxWorker  │  Delivers PENDING → Redis              │
       │  delivers events  │  Max 5 retries → FAILED → DLQ         │
       │  to Redis queues  └────────────────────────────────────────┘
       │
       │                   ┌────────────────────────────────────────┐
       └──────────────────►│      EXECUTION SERVICE                 │
                           │  (no HTTP port)                        │
                           │                                        │
                           │  Settlement loop (matches queue)       │
                           │  ┌─────────────────────────────────┐   │
                           │  │  BEGIN TRANSACTION              │   │
                           │  │  INSERT MatchExecution (PK)     │   │← idempotency
                           │  │  SELECT Wallet FOR UPDATE       │   │
                           │  │  UPDATE buyer wallet            │   │
                           │  │  UPDATE seller wallet           │   │
                           │  │  UPDATE Holding (averageCost)   │   │
                           │  │  INSERT Trade (public feed)     │   │
                           │  │  INSERT Transaction x2          │   │
                           │  │  COMMIT                         │   │
                           │  └─────────────────────────────────┘   │
                           │                                        │
                           │  Order-update loop (order_updates)     │
                           │  UPDATE Order status/filledQty         │
                           │  On CANCEL: release locked funds       │
                           │                                        │
                           │  On settlement failure:                │
                           │  → Push to dlq:matches (DLQ)          │
                           └────────────────────────────────────────┘

                           ┌────────────────────────────────────────┐
                           │      MARKET DATA SERVICE               │
                           │      (inside API Gateway)              │
                           │                                        │
                           │  Twelve Data API                       │
                           │  → 8 symbols per call (rate limit)     │
                           │  → Redis 60s TTL cache                 │
                           │  → PostgreSQL MarketQuote table        │
                           │  → Rotate all 153 stocks over ~5h      │
                           │                                        │
                           │  Reference prices only —               │
                           │  NEVER affects order matching          │
                           └────────────────────────────────────────┘
```

---

## Full Request Flow

### Placing a Limit Buy Order

```
Client
  │
  │  POST /api/v1/order
  │  { symbol: "AAPL_USD", side: "buy", price: "337", quantity: "5" }
  │
  ▼
API Gateway — Order Service
  ├── 1. Zod schema validation
  ├── 2. Check wallet: available cash ≥ price × qty
  ├── 3. Lock funds: wallet.lockedBalance += price × qty
  │
  ├── 4. ATOMIC PostgreSQL transaction ← Transactional Outbox
  │       INSERT Order (status=OPEN)
  │       INSERT OutboxEvent (status=PENDING, payload=CREATE_ORDER)
  │       — if either fails, both roll back — no partial state
  │
  ├── 5. Send directly via Exchange Gateway (fast path)
  │       LPUSH orders:AAPL_USD:buy { clientId, message }
  │
  ▼
Matcher Service
  ├── BRPOP orders:AAPL_USD:buy
  ├── Engine.process({ type: CREATE_ORDER, data })
  ├── Validate wallet has funds (in-memory check)
  ├── Lock funds in-memory
  ├── Orderbook.addOrder(order, { rest: true })
  │       └── matchBuyAgainstAsks()
  │             ├── If no asks ≤ $337 → order rests on bids
  │             └── If match found → fills[]
  │
  ├── For each fill:
  │   ├── LPUSH matches    { MATCH_CREATED, matchId, ... }
  │   ├── LPUSH order_updates { ORDER_UPDATE, ... }
  │   ├── PUBLISH trade@AAPL_USD  → Realtime Service → Browser WS
  │   └── PUBLISH depth@AAPL_USD → Realtime Service → Browser WS
  │
  └── PUBLISH clientId { ORDER_PLACED, orderId, executedQty, fills }
         ↑
         └── API Gateway resolves HTTP response → 201 to client

                              ↓ (async, parallel)
                     Execution Service
                       ├── BRPOP matches
                       ├── BEGIN TRANSACTION
                       ├── INSERT MatchExecution (matchId PK) ← idempotency
                       ├── SELECT Wallet FOR UPDATE (buyer + seller)
                       ├── UPDATE buyer: balance -= quoteQty
                       ├── UPDATE seller: balance += quoteQty
                       ├── UPDATE Holding: buyer qty++, avgCost recalculated
                       ├── UPDATE Holding: seller qty--, realizedPnl updated
                       ├── INSERT Trade (public feed)
                       ├── INSERT Transaction DEBIT (buyer)
                       ├── INSERT Transaction CREDIT (seller)
                       └── COMMIT

                     Outbox Worker (parallel)
                       ├── SELECT OutboxEvent WHERE status=PENDING
                       ├── LPUSH to Redis queue
                       └── UPDATE status=DELIVERED
```

---

## Order Lifecycle

```
                     ┌──────────┐
                     │   NEW    │  Order received by API Gateway
                     └────┬─────┘
                          │ Validation + fund reservation
                          ▼
                     ┌──────────┐
                     │   OPEN   │  Persisted to DB, sent to Matcher
                     └────┬─────┘
                     ┌────┴──────────────────────┐
                     │                           │
                     ▼                           ▼
              ┌─────────────────┐      ┌─────────────────┐
              │ PARTIALLY_FILLED│      │    CANCELLED    │
              │ Some qty matched│      │ User cancelled  │
              └────────┬────────┘      │ Funds released  │
                       │               └─────────────────┘
                       │ Remaining qty matched
                       ▼
                  ┌──────────┐
                  │  FILLED  │  Full qty matched, settlement done
                  └──────────┘

                  ┌──────────┐
                  │  EXPIRED │  4PM ET — all OPEN orders expire
                  │          │  Funds released automatically
                  └──────────┘
```

---

## Services

### API Gateway `:3001`
Single HTTP entry point. Routes to internal services. Owns the **Exchange Gateway** boundary — routes BUY/SELL orders to symbol-specific Redis queues, control messages to `exchange:control`.

### Matcher Service `(no port)`
In-memory order books. Price-time priority. 307 Redis queues (2 per symbol × 153 stocks + 1 control). Creates order books on demand. Recovers OPEN orders from DB on restart. Publishes `MATCH_CREATED` → `matches` queue and `ORDER_UPDATE` → `order_updates` queue.

### Execution Service `(no port)`
Two parallel workers:
- **Settlement loop** → `BRPOP matches` → atomic `BEGIN/COMMIT` per trade
- **Order-update loop** → `BRPOP order_updates` → update Order status

### Outbox Worker `(no port)`
Polls `OutboxEvent` table every 1 second. Delivers PENDING events to Redis with up to 5 retries. Failed events pushed to `dlq:outbox` for inspection.

### Realtime Service `:3002`
WebSocket server. Lazily subscribes to Redis pub/sub channels when clients connect. Fans out `trade@SYMBOL` and `depth@SYMBOL` to all subscribed browsers.

### Web (Next.js) `:13000`
Trading UI. App Router + SSR for server pages, client components for real-time. TradingView lightweight-charts for OHLCV. Auto-refreshing portfolio, wallet, order history.

---

## Production Patterns Implemented

| Pattern | Implementation | Why |
|---|---|---|
| **Transactional Outbox** | Order + OutboxEvent in one `$transaction` | Eliminates dual-write problem |
| **Idempotent settlement** | Unique `matchId` PK on MatchExecution | Prevents double settlement on replay |
| **Atomic transactions** | `BEGIN/SELECT FOR UPDATE/COMMIT` | No partial wallet state |
| **Symbol-specific queues** | `orders:AAPL_USD:buy/sell` | No cross-symbol interference |
| **Fund reservation** | `lockedBalance` / `lockedQuantity` | Prevents double-spend |
| **Order book recovery** | Replay OPEN orders from DB on startup | No stuck orders after restart |
| **Dead Letter Queue** | `dlq:matches` / `dlq:outbox` Redis lists | No silent message loss |
| **Order expiry** | Cron at 4PM ET, releases all locks | Mimics real market close |
| **Request-reply** | UUID correlation ID over Redis pub/sub | Sync HTTP over async queue |
| **Weighted-average cost** | `avgCost = (oldQty×oldCost + fillQty×price) / newQty` | Accurate P&L tracking |

---

## Technology Stack

| Category | Technology |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| **UI Components** | Shadcn/UI, Radix UI, Lucide React |
| **Charts** | TradingView lightweight-charts v5 |
| **Backend** | Node.js, TypeScript, Express.js v5 |
| **Database** | PostgreSQL 17, Prisma v7 |
| **Message Bus** | Redis 8 (Lists for queues, Pub/Sub for fanout) |
| **Auth** | NextAuth v4 (credentials) |
| **Real-time** | WebSocket (`ws`), SSE (native Node.js) |
| **Market Data** | Twelve Data API (reference prices only) |
| **Validation** | Zod |
| **Testing** | Vitest (82 tests) |
| **Containerisation** | Docker Compose (8 services) |

---

## Database Schema

```
User ──────────────────────────────────────────────────────────┐
  │                                                            │
  ├─── Wallet (1:1)                                           │
  │      balance         DECIMAL   available cash             │
  │      lockedBalance   DECIMAL   locked in open BUY orders  │
  │      assetsHeld      JSON      { "AAPL": 10, ... }        │
  │      └─── Transaction[]  full audit log                   │
  │                                                           │
  ├─── Holding[] (1:N)                                        │
  │      symbol          TEXT      e.g. "AAPL"                │
  │      quantity        DECIMAL   total shares               │
  │      lockedQuantity  DECIMAL   locked in SELL orders      │
  │      averageCost     DECIMAL   weighted-avg cost basis     │
  │      realizedPnl     DECIMAL   cumulative realized P&L    │
  │                                                           │
  ├─── Order[] (1:N)                                          │
  │      symbol          TEXT      e.g. "AAPL"                │
  │      side            BUY|SELL                             │
  │      orderType       LIMIT|MARKET                         │
  │      price           DECIMAL                              │
  │      quantity        DECIMAL                              │
  │      filledQty       DECIMAL                              │
  │      remainingQty    DECIMAL                              │
  │      status          OPEN|PARTIALLY_FILLED|FILLED|...     │
  │      exchangeOrderId TEXT      confirmed by Matcher       │
  │                                                           │
  └─── Watchlist[]                                            │
                                                              │
Stock ◄────────────────────────────────────────────────────── ┘
  symbol       TEXT PK   e.g. "AAPL"
  companyName  TEXT       e.g. "Apple Inc."
  sector       TEXT       e.g. "Technology"
  quoteAsset   TEXT       "USD"
  └─── MarketQuote (1:1)   cached Twelve Data prices

MatchExecution (idempotency table)
  matchId PK   UUID — unique per fill event
  buyOrderId, sellOrderId, symbol, price, quantity
  status   SETTLED|FAILED

Trade (public feed)
  id, symbol, price, quantity, isBuyerMaker, timestamp

OutboxEvent (Transactional Outbox)
  id, eventType, payload JSON, status PENDING|DELIVERED|FAILED
  retries INT, error TEXT
```

---

## Getting Started

### Prerequisites

- Docker Desktop
- Git

### Quick Start

```bash
# 1. Clone
git clone https://github.com/Aryan012334/StockX.git
cd StockX

# 2. Environment
cp .env.example .env

# Edit .env — only required change:
# NEXTAUTH_SECRET=any-random-32-char-string
# Optional: TWELVE_DATA_API_KEY=your_key (for live prices)

# 3. Start everything
docker compose up --build

# 4. Open
open http://localhost:13000
```

> First run takes ~5 minutes to build all Docker images. Subsequent starts are instant.

### What happens on first boot

```
postgres starts
    └── execution-service runs prisma migrate deploy
            └── 3 migrations applied
            └── 153 US stocks seeded (AAPL, MSFT, NVDA, TSLA, ...)
redis starts
matcher-service starts
    └── loadAllWallets() — loads user wallets from DB
    └── recoverOpenOrders() — replays OPEN orders into order books
execution-service starts
    └── settlementLoop() listening on 'matches'
    └── orderUpdateLoop() listening on 'order_updates'
outbox-worker starts
    └── polling OutboxEvent every 1s
api-gateway starts
    └── Exchange Gateway connected to Redis
    └── Market data refresh loop started (15 min interval)
    └── Order expiry scheduler started (checks every minute)
realtime-service starts
    └── WebSocket server on :13002
web starts
    └── Next.js standalone server on :13000
```

---

## Environment Variables

```bash
# PostgreSQL
POSTGRES_USER=stockx
POSTGRES_PASSWORD=stockx_secret
POSTGRES_DB=stockx
DATABASE_URL="postgresql://stockx:stockx_secret@postgres:5432/stockx"

# Redis
REDIS_URL=redis://redis:6379

# Auth
NEXTAUTH_URL=http://localhost:13000
NEXTAUTH_SECRET=your-32-char-secret-here

# Frontend URLs (baked into Next.js build)
NEXT_PUBLIC_REST_API_URL=http://localhost:13001/api/v1
NEXT_PUBLIC_WS_BASE_URL=ws://localhost:13002
NEXT_PUBLIC_BASE_URL=http://localhost:13000

# Server-side internal URL (Docker network)
INTERNAL_API_URL=http://api-gateway:3001/api/v1

# Optional — Twelve Data for live reference prices
# Free tier: 800 credits/day. Get key at twelvedata.com
TWELVE_DATA_API_KEY=your_key_here
```

> **Ports:** `13000/13001/13002` are used (not 3000/3001/3002) to avoid conflicts with other Docker projects. Change in `docker-compose.yml` and `.env` if needed.

---

## API Reference

### Market Data
```
GET  /api/v1/market/quotes              — all 153 stocks with cached prices
GET  /api/v1/market/quotes/:symbol      — single stock live quote
GET  /api/v1/market/candles/:symbol     — OHLCV candles (Twelve Data)
GET  /api/v1/market/search?q=apple      — search by name or symbol
POST /api/v1/market/admin/list          — list a new stock
```

### Orders
```
POST   /api/v1/order                    — place limit or market order
DELETE /api/v1/order                    — cancel open order
GET    /api/v1/order/open?userId=&symbol=   — live open orders (from matcher)
GET    /api/v1/order/history?userId=    — persisted order history
```

### Price (SimX trade prices)
```
GET /api/v1/price/tickers               — 24h summary from Trade table
GET /api/v1/price/history/:symbol       — recent trades for sparklines
GET /api/v1/price/stream/:symbol        — SSE one-way price stream
```

### Portfolio
```
GET  /api/v1/holdings?userId=           — holdings with P&L
GET  /api/v1/wallet/me?userId=          — wallet summary
POST /api/v1/wallet/deposit             — simulated deposit
POST /api/v1/wallet/withdraw            — simulated withdrawal
GET  /api/v1/wallet/transactions        — transaction history
```

### Watchlist
```
GET    /api/v1/watchlist?userId=        — user's favorites
POST   /api/v1/watchlist                — add to watchlist
DELETE /api/v1/watchlist/:symbol        — remove from watchlist
```

### Admin / Debug
```
GET /health                             — service health check
GET /admin/dlq                          — inspect Dead Letter Queue
```

---

## Testing

```bash
cd packages
npm run test    # 82 tests across 4 files
```

**Test coverage:**

| Test file | What it covers |
|---|---|
| `orderbook.test.ts` | Price-time priority, partial fills, IOC orders, depth aggregation |
| `engine-balances.test.ts` | Fund locking, reconciliation, insufficient funds, cancellation |
| `exchange-invariants.test.ts` | 1000 random orders: quantity conservation, balance conservation, no-crossed-book |
| `snowflake.test.ts` | UUID uniqueness, format validation |

---

## Project Structure

```
StockX/
├── packages/
│   ├── shared/                 TypeScript types shared across all services
│   │   ├── engineEvents.ts     Queue name constants, event type constants
│   │   ├── engineProtocol.ts   API Gateway ↔ Matcher message contracts
│   │   ├── dbMessages.ts       Matcher → Execution Service contracts
│   │   ├── wsMessages.ts       WebSocket message shapes
│   │   └── webUI.ts            Frontend type definitions
│   │
│   ├── api-gateway/            Express REST API — single entry point
│   │   ├── src/
│   │   │   ├── index.ts        Service startup, route registration
│   │   │   ├── exchangeGateway.ts  Routes orders to symbol-specific queues
│   │   │   ├── orderExpiry.ts  4PM ET daily order expiry scheduler
│   │   │   ├── marketData/
│   │   │   │   └── provider.ts Twelve Data abstraction + Redis cache
│   │   │   └── routes/
│   │   │       ├── order.ts    Order placement (Transactional Outbox)
│   │   │       ├── market.ts   Reference prices + stock admin
│   │   │       ├── price.ts    SimX trade prices + SSE stream
│   │   │       ├── holdings.ts Portfolio, wallet, watchlist
│   │   │       └── stocks.ts   Stock catalog
│   │
│   ├── matcher-service/        In-memory matching engine
│   │   └── src/
│   │       ├── index.ts        Startup: wallet warmup, order recovery, queue listen
│   │       ├── redisClient.ts  pushMatchCreated, pushOrderUpdate, publishWsMessage
│   │       └── trade/
│   │           ├── Engine.ts   Order lifecycle, fund locking, event emission
│   │           └── Orderbook.ts Price-time priority, partial fills
│   │
│   ├── execution-service/      Settlement + schema
│   │   ├── prisma/
│   │   │   ├── schema.prisma   Full DB schema (13 models)
│   │   │   └── migrations/     3 clean migrations
│   │   └── src/
│   │       ├── client.ts       Prisma + pg driver adapter
│   │       ├── executionWorker.ts  Atomic settlement + DLQ
│   │       └── outboxWorker.ts     Transactional Outbox delivery
│   │
│   ├── realtime-service/       WebSocket server
│   │   └── src/
│   │       ├── subscriptionManager.ts  Lazy Redis pub/sub, WS fanout
│   │       ├── userManager.ts  Connection registry
│   │       └── user.ts         Per-connection SUBSCRIBE/UNSUBSCRIBE
│   │
│   └── web/                    Next.js 16 trading UI
│       ├── app/
│       │   ├── page.tsx        Landing page
│       │   ├── markets/        153-stock market list
│       │   ├── trade/[market]/ Chart + order book + order entry
│       │   └── user/           Portfolio, orders, wallet, profile
│       └── components/markets/
│           ├── tvChartCard.tsx  OHLCV chart (lightweight-charts)
│           ├── orderBook.tsx    Live depth with spread + bid/ask bar
│           ├── orderEntry.tsx   Buy/sell form with balance validation
│           ├── bottomPannel.tsx Open orders + order history
│           └── marketBar.tsx    Ticker bar with live price
│
├── tests/
│   ├── unit/engine/            Orderbook + Engine unit tests
│   └── invariants/             Property-based invariant tests
│
├── docker-compose.yml          8 services: postgres, redis, api-gateway,
│                               matcher, execution, outbox-worker,
│                               realtime, web
└── .env.example                All required environment variables
```

---

## Key Design Decisions

**Why Redis instead of Kafka?**
Redis queues give the same decoupling and async processing for this scale. Kafka is the natural upgrade path for distributed partitioning across multiple broker nodes and replay from offsets. The symbol-specific queue naming convention (`orders:AAPL_USD:buy`) means switching to Kafka topics requires no architectural change — just a different client.

**Why keep the Matcher single-threaded?**
Correctness requires strict ordering per symbol. The Matcher processes one message at a time per symbol queue, guaranteeing no race conditions. To scale throughput, the architecture already supports horizontal sharding — split symbols across multiple Matcher instances. 10 shards × 35 orders/sec = ~350 orders/sec with zero code changes.

**Why separate Matcher from Execution Service?**
They solve fundamentally different problems. The Matcher is compute-intensive, stateless (in-memory), and must be fast. The Execution Service is I/O-intensive, stateful (Postgres), and must be ACID-compliant. Separating them means a slow DB write never blocks the matching engine.

**Why Transactional Outbox instead of direct Redis push?**
Without the outbox, writing to Postgres and then pushing to Redis are two separate operations. If the Redis push fails after the DB write, the order exists in the DB but never reaches the Matcher — funds are locked forever. The outbox makes both writes atomic in one PostgreSQL transaction, then delivers reliably with retries.

---

## Known Limitations (Future Improvements)

| Limitation | Production Fix |
|---|---|
| Single Matcher process | Horizontal symbol sharding across N Matcher nodes |
| Redis at-least-once | Kafka for exactly-once delivery guarantees |
| Outbox worker polls DB | CDC with Debezium — reads PostgreSQL WAL, sub-10ms latency |
| Single PostgreSQL instance | Read replicas for price/stock reads |
| No reconciliation job | Background job comparing Order DB with exchange state |

---

## Developed By

**Aryan Yewale**

---

*StockX is a simulation platform for educational purposes. No real money, no real stocks, no financial advice.*
