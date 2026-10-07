-- StockX — Initial Migration
-- Plain PostgreSQL (no TimescaleDB required)

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

CREATE TYPE "StockStatus" AS ENUM ('ACTIVE', 'DELISTED');
CREATE TYPE "OrderSide" AS ENUM ('BUY', 'SELL');
CREATE TYPE "OrderType" AS ENUM ('LIMIT', 'MARKET');
CREATE TYPE "OrderStatus" AS ENUM ('OPEN', 'PARTIALLY_FILLED', 'FILLED', 'CANCELLED', 'EXPIRED');
CREATE TYPE "SettlementStatus" AS ENUM ('SETTLED', 'FAILED');
CREATE TYPE "TransactionType" AS ENUM ('CREDIT', 'DEBIT');
CREATE TYPE "TransactionCategory" AS ENUM ('SIGNUP_BONUS', 'ORDER_BUY', 'ORDER_SELL');

-- ---------------------------------------------------------------------------
-- Auth
-- ---------------------------------------------------------------------------

CREATE TABLE "User" (
    "id"            TEXT NOT NULL,
    "name"          TEXT,
    "email"         TEXT,
    "emailVerified" TIMESTAMP(3),
    "image"         TEXT,
    "password"      TEXT,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Account" (
    "id"                TEXT NOT NULL,
    "userId"            TEXT NOT NULL,
    "type"              TEXT NOT NULL,
    "provider"          TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token"     TEXT,
    "access_token"      TEXT,
    "expires_at"        INTEGER,
    "token_type"        TEXT,
    "scope"             TEXT,
    "id_token"          TEXT,
    "session_state"     TEXT,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- ---------------------------------------------------------------------------
-- Stock service
-- ---------------------------------------------------------------------------

CREATE TABLE "Stock" (
    "symbol"      TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "status"      "StockStatus" NOT NULL DEFAULT 'ACTIVE',
    "baseAsset"   TEXT NOT NULL,
    "quoteAsset"  TEXT NOT NULL DEFAULT 'INR',
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stock_pkey" PRIMARY KEY ("symbol")
);

-- Seed the three supported stocks
INSERT INTO "Stock" ("symbol", "companyName", "baseAsset", "quoteAsset") VALUES
    ('RIL',  'Reliance Industries Ltd',  'RIL',  'INR'),
    ('TATA', 'Tata Consultancy Services','TATA', 'INR'),
    ('SOL',  'Solar Industries Ltd',     'SOL',  'INR');

-- ---------------------------------------------------------------------------
-- Wallet
-- ---------------------------------------------------------------------------

CREATE TABLE "Wallet" (
    "userId"    TEXT NOT NULL,
    "balance"   DECIMAL(65,30) NOT NULL DEFAULT 50000,
    "assetsHeld" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3),
    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("userId"),
    CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------
-- Order service
-- ---------------------------------------------------------------------------

CREATE TABLE "Order" (
    "id"           TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId"       TEXT NOT NULL,
    "symbol"       TEXT NOT NULL,
    "side"         "OrderSide" NOT NULL,
    "orderType"    "OrderType" NOT NULL,
    "price"        DECIMAL(65,30) NOT NULL,
    "quantity"     DECIMAL(65,30) NOT NULL,
    "filledQty"    DECIMAL(65,30) NOT NULL DEFAULT 0,
    "remainingQty" DECIMAL(65,30) NOT NULL,
    "status"       "OrderStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id"),
    CONSTRAINT "Order_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Stock"("symbol")
);
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
CREATE INDEX "Order_symbol_status_idx" ON "Order"("symbol", "status");

-- ---------------------------------------------------------------------------
-- Match Execution (settlement + idempotency)
-- ---------------------------------------------------------------------------

CREATE TABLE "MatchExecution" (
    "matchId"       TEXT NOT NULL,
    "buyOrderId"    TEXT NOT NULL,
    "sellOrderId"   TEXT NOT NULL,
    "symbol"        TEXT NOT NULL,
    "price"         DECIMAL(65,30) NOT NULL,
    "quantity"      DECIMAL(65,30) NOT NULL,
    "quoteQuantity" DECIMAL(65,30) NOT NULL,
    "buyerId"       TEXT NOT NULL,
    "sellerId"      TEXT NOT NULL,
    "isBuyerMaker"  BOOLEAN NOT NULL,
    "status"        "SettlementStatus" NOT NULL DEFAULT 'SETTLED',
    "settledAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MatchExecution_pkey" PRIMARY KEY ("matchId")
);

-- ---------------------------------------------------------------------------
-- Public trade feed
-- ---------------------------------------------------------------------------

CREATE TABLE "Trade" (
    "id"            TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "symbol"        TEXT NOT NULL,
    "price"         DECIMAL(65,30) NOT NULL,
    "quantity"      DECIMAL(65,30) NOT NULL,
    "quoteQuantity" DECIMAL(65,30) NOT NULL,
    "isBuyerMaker"  BOOLEAN NOT NULL,
    "timestamp"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Trade_symbol_timestamp_idx" ON "Trade"("symbol", "timestamp" DESC);

-- ---------------------------------------------------------------------------
-- Wallet transactions (audit log)
-- ---------------------------------------------------------------------------

CREATE TABLE "Transaction" (
    "id"           TEXT NOT NULL,
    "walletId"     TEXT NOT NULL,
    "type"         "TransactionType" NOT NULL,
    "category"     "TransactionCategory" NOT NULL,
    "description"  TEXT NOT NULL,
    "amount"       DECIMAL(65,30) NOT NULL,
    "balanceAfter" DECIMAL(65,30) NOT NULL,
    "ticker"       TEXT,
    "quantity"     DECIMAL(65,30),
    "price"        DECIMAL(65,30),
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("userId") ON DELETE CASCADE
);
