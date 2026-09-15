# StockX — Stock Trading Simulation Platform

A full-stack stock trading simulation built on the CortexCookie Stock Exchange and Stock Trading system designs. The architecture separates a user-facing **Trading App** from an internal **Stock Exchange**, demonstrating core concepts used in real financial systems.

---

## What is StockX?

StockX lets users register, receive simulated capital (₹50,000 + seed stock allocation), and trade stocks in real time against a live in-memory matching engine. Every order, trade, and settlement is persisted to PostgreSQL. The UI updates in real time via WebSocket without page refreshes.

---

## Key Features

- **Limit and market orders** with price-time priority matching
- **Partial fills** — a 100-share buy order matched against two 40-share and one 20-share sell fills correctly
- **Atomic settlement** — each match debits the buyer, credits the seller, and records the trade in a single PostgreSQL transaction
- **Idempotent execution** — duplicate match events are safely discarded via a unique `matchId` constraint
- **Real-time updates** — live order book depth, trade feed, and price chart via WebSocket
- **Durable order persistence** — orders are written to PostgreSQL before being sent to the matcher
- **Stock Service** — list and browse tradeable instruments
- **Price Service** — 24 h ticker stats and trade history derived from the `Trade` table (no TimescaleDB)

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS, Shadcn UI |
| API Gateway | Node.js, Express 5, TypeScript |
| Matcher Service | Node.js, TypeScript, in-memory |
| Execution Service | Node.js, TypeScript, `pg` |
| Realtime Service | Node.js, `ws` library |
| Database | PostgreSQL 17 (plain, no extensions) |
| Message Bus | Redis 8 (pub/sub + list queues) |
| Local dev | Docker Compose |

---

## Architecture Overview

```
Browser
   │
   ├── REST (HTTP)
   │       │
   │       ▼
   │   API Gateway  (:3001)
   │   ┌──────────────────────────────────┐
   │   │  /stocks   → Stock Service       │
   │   │  /price    → Price Service       │
   │   │  /order    → Order Service       │
   │   │  /depth    → Matcher (live)      │
   │   └──────────────────────────────────┘
   │           │ Redis "messages" queue
   │           ▼
   │   Matcher Service  (no HTTP port)
   │   ┌──────────────────────────────────┐
   │   │  In-memory Order Books           │
   │   │  Price-time priority matching    │
   │   │  Emits MATCH_CREATED events      │
   │   └──────────────────────────────────┘
   │           │ Redis "db_processor" queue
   │           ▼
   │   Execution Service  (no HTTP port)
   │   ┌──────────────────────────────────┐
   │   │  Atomic PostgreSQL settlement    │
   │   │  Idempotency via matchId         │
   │   │  Persists Orders + Trades        │
   │   └──────────────────────────────────┘
   │
   └── WebSocket
           │
           ▼
       Realtime Service  (:3002)
       ┌──────────────────────────────────┐
       │  Redis pub/sub → WS fanout       │
       │  trade@SYMBOL  depth@SYMBOL      │
       └──────────────────────────────────┘
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full Mermaid diagram.

---

## Running Locally

### Prerequisites

- Docker and Docker Compose

### Steps

```bash
# 1. Clone and enter
git clone <repo-url>
cd exchange-lab

# 2. Configure environment
cp .env.example .env
# Edit .env if needed (defaults work for local Docker)

# 3. Start all services
docker compose up --build

# 4. Open the app
open http://localhost:3000
```

The first run applies the Prisma migration automatically (via the `execution-service` container startup command), seeds the three stocks (RIL, TATA, SOL), and starts all services.

---

## Demo Flow

```
1. Open http://localhost:3000
2. Sign up → receive ₹50,000 + 50 shares each of RIL, TATA, SOL
3. Browse /markets → see all active stocks
4. Click any stock → go to /trade/RIL_INR
5. View live order book (depth) and trade feed
6. Place a LIMIT BUY order at a price
7. In another tab / session, place a LIMIT SELL order at the same price
8. Watch the Matcher detect the match
9. See the trade appear in the trade feed (WebSocket, no refresh)
10. Open Order History tab → see FILLED status
11. Check /user/portfolio → updated holdings and cash balance
```

---

## Project Structure

```
packages/
├── shared/            — TypeScript types shared by all services
├── api-gateway/       — REST API Gateway (Express)
├── matcher-service/   — In-memory matching engine
├── execution-service/ — Settlement worker + Prisma schema
├── realtime-service/  — WebSocket server
└── web/               — Next.js frontend
```
