-- StockX Product Pass Migration
-- Adds: Holding, Watchlist, MarketQuote models
-- Updates: Wallet (lockedBalance), Order (averageFillPrice), Stock (sector)
-- Updates: TransactionCategory enum (DEPOSIT, WITHDRAWAL, refund types)
-- Replaces: old 3-stock seed with 150 US equities

-- ---------------------------------------------------------------------------
-- Schema updates to existing tables
-- ---------------------------------------------------------------------------

ALTER TABLE "Stock" ADD COLUMN IF NOT EXISTS "sector" TEXT;
ALTER TABLE "Wallet" ADD COLUMN IF NOT EXISTS "lockedBalance" DECIMAL(65,30) NOT NULL DEFAULT 0;
ALTER TABLE "Wallet" ADD COLUMN IF NOT EXISTS "assetsHeld" JSONB NOT NULL DEFAULT '{}';
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "averageFillPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- Update quoteAsset default for new stocks (USD)
-- Existing rows keep INR, new ones will be USD

-- ---------------------------------------------------------------------------
-- Extend TransactionCategory enum
-- ---------------------------------------------------------------------------

ALTER TYPE "TransactionCategory" ADD VALUE IF NOT EXISTS 'DEPOSIT';
ALTER TYPE "TransactionCategory" ADD VALUE IF NOT EXISTS 'WITHDRAWAL';
ALTER TYPE "TransactionCategory" ADD VALUE IF NOT EXISTS 'ORDER_BUY_REFUND';
ALTER TYPE "TransactionCategory" ADD VALUE IF NOT EXISTS 'ORDER_SELL_REFUND';

-- ---------------------------------------------------------------------------
-- MarketQuote — cached external price data
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "MarketQuote" (
    "symbol"          TEXT NOT NULL,
    "price"           DECIMAL(65,30) NOT NULL DEFAULT 0,
    "previousClose"   DECIMAL(65,30) NOT NULL DEFAULT 0,
    "open"            DECIMAL(65,30) NOT NULL DEFAULT 0,
    "dayHigh"         DECIMAL(65,30) NOT NULL DEFAULT 0,
    "dayLow"          DECIMAL(65,30) NOT NULL DEFAULT 0,
    "volume"          DECIMAL(65,30) NOT NULL DEFAULT 0,
    "change"          DECIMAL(65,30) NOT NULL DEFAULT 0,
    "changePercent"   DECIMAL(65,30) NOT NULL DEFAULT 0,
    "isDelayed"       BOOLEAN NOT NULL DEFAULT true,
    "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MarketQuote_pkey" PRIMARY KEY ("symbol"),
    CONSTRAINT "MarketQuote_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Stock"("symbol")
);
CREATE INDEX IF NOT EXISTS "MarketQuote_updatedAt_idx" ON "MarketQuote"("updatedAt");

-- ---------------------------------------------------------------------------
-- Holding — per-user stock positions with cost basis
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "Holding" (
    "id"             TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId"         TEXT NOT NULL,
    "symbol"         TEXT NOT NULL,
    "quantity"       DECIMAL(65,30) NOT NULL DEFAULT 0,
    "lockedQuantity" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageCost"    DECIMAL(65,30) NOT NULL DEFAULT 0,
    "realizedPnl"    DECIMAL(65,30) NOT NULL DEFAULT 0,
    "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Holding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Holding_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Stock"("symbol"),
    CONSTRAINT "Holding_userId_symbol_key" UNIQUE ("userId", "symbol")
);
CREATE INDEX IF NOT EXISTS "Holding_userId_idx" ON "Holding"("userId");

-- ---------------------------------------------------------------------------
-- Watchlist — per-user favorited stocks
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "Watchlist" (
    "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId"    TEXT NOT NULL,
    "symbol"    TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Watchlist_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Stock"("symbol"),
    CONSTRAINT "Watchlist_userId_symbol_key" UNIQUE ("userId", "symbol")
);
CREATE INDEX IF NOT EXISTS "Watchlist_userId_idx" ON "Watchlist"("userId");

-- ---------------------------------------------------------------------------
-- Remove old 3-stock seed, insert 150 US equities
-- ---------------------------------------------------------------------------

DELETE FROM "Stock" WHERE "symbol" IN ('RIL','TATA','SOL');

INSERT INTO "Stock" ("symbol","companyName","sector","baseAsset","quoteAsset") VALUES
-- Technology
('AAPL','Apple Inc.','Technology','AAPL','USD'),
('MSFT','Microsoft Corp.','Technology','MSFT','USD'),
('NVDA','NVIDIA Corp.','Technology','NVDA','USD'),
('GOOGL','Alphabet Inc.','Technology','GOOGL','USD'),
('META','Meta Platforms Inc.','Technology','META','USD'),
('AMZN','Amazon.com Inc.','Consumer Cyclical','AMZN','USD'),
('AMD','Advanced Micro Devices','Technology','AMD','USD'),
('INTC','Intel Corp.','Technology','INTC','USD'),
('ORCL','Oracle Corp.','Technology','ORCL','USD'),
('CRM','Salesforce Inc.','Technology','CRM','USD'),
('ADBE','Adobe Inc.','Technology','ADBE','USD'),
('AVGO','Broadcom Inc.','Technology','AVGO','USD'),
('QCOM','Qualcomm Inc.','Technology','QCOM','USD'),
('TXN','Texas Instruments Inc.','Technology','TXN','USD'),
('MU','Micron Technology Inc.','Technology','MU','USD'),
('AMAT','Applied Materials Inc.','Technology','AMAT','USD'),
('LRCX','Lam Research Corp.','Technology','LRCX','USD'),
('KLAC','KLA Corp.','Technology','KLAC','USD'),
('MRVL','Marvell Technology Inc.','Technology','MRVL','USD'),
('CDNS','Cadence Design Systems','Technology','CDNS','USD'),
('SNPS','Synopsys Inc.','Technology','SNPS','USD'),
('NOW','ServiceNow Inc.','Technology','NOW','USD'),
('WDAY','Workday Inc.','Technology','WDAY','USD'),
('SNOW','Snowflake Inc.','Technology','SNOW','USD'),
('PLTR','Palantir Technologies','Technology','PLTR','USD'),
('PANW','Palo Alto Networks','Technology','PANW','USD'),
('CRWD','CrowdStrike Holdings','Technology','CRWD','USD'),
('ZS','Zscaler Inc.','Technology','ZS','USD'),
('OKTA','Okta Inc.','Technology','OKTA','USD'),
('DDOG','Datadog Inc.','Technology','DDOG','USD'),
-- Communications & Media
('NFLX','Netflix Inc.','Communication Services','NFLX','USD'),
('DIS','Walt Disney Co.','Communication Services','DIS','USD'),
('CMCSA','Comcast Corp.','Communication Services','CMCSA','USD'),
('T','AT&T Inc.','Communication Services','T','USD'),
('VZ','Verizon Communications','Communication Services','VZ','USD'),
('TMUS','T-Mobile US Inc.','Communication Services','TMUS','USD'),
('SPOT','Spotify Technology','Communication Services','SPOT','USD'),
('TTWO','Take-Two Interactive','Communication Services','TTWO','USD'),
('EA','Electronic Arts Inc.','Communication Services','EA','USD'),
('RBLX','Roblox Corp.','Communication Services','RBLX','USD'),
-- Financial
('JPM','JPMorgan Chase & Co.','Financial Services','JPM','USD'),
('BAC','Bank of America Corp.','Financial Services','BAC','USD'),
('WFC','Wells Fargo & Co.','Financial Services','WFC','USD'),
('GS','Goldman Sachs Group','Financial Services','GS','USD'),
('MS','Morgan Stanley','Financial Services','MS','USD'),
('V','Visa Inc.','Financial Services','V','USD'),
('MA','Mastercard Inc.','Financial Services','MA','USD'),
('PYPL','PayPal Holdings Inc.','Financial Services','PYPL','USD'),
('AXP','American Express Co.','Financial Services','AXP','USD'),
('C','Citigroup Inc.','Financial Services','C','USD'),
('BLK','BlackRock Inc.','Financial Services','BLK','USD'),
('SCHW','Charles Schwab Corp.','Financial Services','SCHW','USD'),
('COF','Capital One Financial','Financial Services','COF','USD'),
('USB','US Bancorp','Financial Services','USB','USD'),
('PNC','PNC Financial Services','Financial Services','PNC','USD'),
('BX','Blackstone Inc.','Financial Services','BX','USD'),
('KKR','KKR & Co. Inc.','Financial Services','KKR','USD'),
('SPGI','S&P Global Inc.','Financial Services','SPGI','USD'),
('MCO','Moodys Corp.','Financial Services','MCO','USD'),
('ICE','Intercontinental Exchange','Financial Services','ICE','USD'),
-- Consumer
('WMT','Walmart Inc.','Consumer Defensive','WMT','USD'),
('COST','Costco Wholesale Corp.','Consumer Defensive','COST','USD'),
('KO','Coca-Cola Co.','Consumer Defensive','KO','USD'),
('PEP','PepsiCo Inc.','Consumer Defensive','PEP','USD'),
('MCD','McDonalds Corp.','Consumer Cyclical','MCD','USD'),
('SBUX','Starbucks Corp.','Consumer Cyclical','SBUX','USD'),
('NKE','Nike Inc.','Consumer Cyclical','NKE','USD'),
('TGT','Target Corp.','Consumer Defensive','TGT','USD'),
('HD','Home Depot Inc.','Consumer Cyclical','HD','USD'),
('LOW','Lowes Companies','Consumer Cyclical','LOW','USD'),
('TSLA','Tesla Inc.','Consumer Cyclical','TSLA','USD'),
('F','Ford Motor Co.','Consumer Cyclical','F','USD'),
('GM','General Motors Co.','Consumer Cyclical','GM','USD'),
('RIVN','Rivian Automotive','Consumer Cyclical','RIVN','USD'),
('LCID','Lucid Group Inc.','Consumer Cyclical','LCID','USD'),
('YUM','Yum! Brands Inc.','Consumer Cyclical','YUM','USD'),
('CMG','Chipotle Mexican Grill','Consumer Cyclical','CMG','USD'),
('DPZ','Dominos Pizza Inc.','Consumer Cyclical','DPZ','USD'),
('BKNG','Booking Holdings Inc.','Consumer Cyclical','BKNG','USD'),
('ABNB','Airbnb Inc.','Consumer Cyclical','ABNB','USD'),
-- Healthcare
('JNJ','Johnson & Johnson','Healthcare','JNJ','USD'),
('UNH','UnitedHealth Group','Healthcare','UNH','USD'),
('PFE','Pfizer Inc.','Healthcare','PFE','USD'),
('MRK','Merck & Co. Inc.','Healthcare','MRK','USD'),
('ABBV','AbbVie Inc.','Healthcare','ABBV','USD'),
('LLY','Eli Lilly & Co.','Healthcare','LLY','USD'),
('TMO','Thermo Fisher Scientific','Healthcare','TMO','USD'),
('ABT','Abbott Laboratories','Healthcare','ABT','USD'),
('DHR','Danaher Corp.','Healthcare','DHR','USD'),
('BMY','Bristol-Myers Squibb','Healthcare','BMY','USD'),
('AMGN','Amgen Inc.','Healthcare','AMGN','USD'),
('GILD','Gilead Sciences Inc.','Healthcare','GILD','USD'),
('ISRG','Intuitive Surgical Inc.','Healthcare','ISRG','USD'),
('EW','Edwards Lifesciences','Healthcare','EW','USD'),
('BIIB','Biogen Inc.','Healthcare','BIIB','USD'),
('MRNA','Moderna Inc.','Healthcare','MRNA','USD'),
('REGN','Regeneron Pharmaceuticals','Healthcare','REGN','USD'),
('VRTX','Vertex Pharmaceuticals','Healthcare','VRTX','USD'),
('DXCM','DexCom Inc.','Healthcare','DXCM','USD'),
('HCA','HCA Healthcare Inc.','Healthcare','HCA','USD'),
-- Industrials
('GE','GE Aerospace','Industrials','GE','USD'),
('CAT','Caterpillar Inc.','Industrials','CAT','USD'),
('DE','Deere & Co.','Industrials','DE','USD'),
('HON','Honeywell Intl Inc.','Industrials','HON','USD'),
('RTX','RTX Corp.','Industrials','RTX','USD'),
('LMT','Lockheed Martin Corp.','Industrials','LMT','USD'),
('NOC','Northrop Grumman Corp.','Industrials','NOC','USD'),
('GD','General Dynamics Corp.','Industrials','GD','USD'),
('BA','Boeing Co.','Industrials','BA','USD'),
('UPS','United Parcel Service','Industrials','UPS','USD'),
('FDX','FedEx Corp.','Industrials','FDX','USD'),
('CSX','CSX Corp.','Industrials','CSX','USD'),
('UNP','Union Pacific Corp.','Industrials','UNP','USD'),
('NSC','Norfolk Southern Corp.','Industrials','NSC','USD'),
('MMM','3M Co.','Industrials','MMM','USD'),
('EMR','Emerson Electric Co.','Industrials','EMR','USD'),
('ETN','Eaton Corp.','Industrials','ETN','USD'),
('PH','Parker-Hannifin Corp.','Industrials','PH','USD'),
('ITW','Illinois Tool Works','Industrials','ITW','USD'),
('CARR','Carrier Global Corp.','Industrials','CARR','USD'),
-- Energy
('XOM','Exxon Mobil Corp.','Energy','XOM','USD'),
('CVX','Chevron Corp.','Energy','CVX','USD'),
('COP','ConocoPhillips','Energy','COP','USD'),
('EOG','EOG Resources Inc.','Energy','EOG','USD'),
('SLB','SLB (Schlumberger)','Energy','SLB','USD'),
('PSX','Phillips 66','Energy','PSX','USD'),
('VLO','Valero Energy Corp.','Energy','VLO','USD'),
('MPC','Marathon Petroleum Corp.','Energy','MPC','USD'),
('OXY','Occidental Petroleum','Energy','OXY','USD'),
('HAL','Halliburton Co.','Energy','HAL','USD'),
-- Materials & Utilities
('LIN','Linde plc','Basic Materials','LIN','USD'),
('APD','Air Products & Chemicals','Basic Materials','APD','USD'),
('ECL','Ecolab Inc.','Basic Materials','ECL','USD'),
('SHW','Sherwin-Williams Co.','Basic Materials','SHW','USD'),
('FCX','Freeport-McMoRan Inc.','Basic Materials','FCX','USD'),
('NEM','Newmont Corp.','Basic Materials','NEM','USD'),
('NEE','NextEra Energy Inc.','Utilities','NEE','USD'),
('DUK','Duke Energy Corp.','Utilities','DUK','USD'),
('SO','Southern Co.','Utilities','SO','USD'),
('AEP','American Electric Power','Utilities','AEP','USD'),
-- Real Estate & Other
('AMT','American Tower Corp.','Real Estate','AMT','USD'),
('PLD','Prologis Inc.','Real Estate','PLD','USD'),
('EQIX','Equinix Inc.','Real Estate','EQIX','USD'),
('CCI','Crown Castle Inc.','Real Estate','CCI','USD'),
('SPG','Simon Property Group','Real Estate','SPG','USD'),
('O','Realty Income Corp.','Real Estate','O','USD'),
('BRK.B','Berkshire Hathaway B','Financial Services','BRK.B','USD'),
('UBER','Uber Technologies Inc.','Technology','UBER','USD'),
('LYFT','Lyft Inc.','Technology','LYFT','USD'),
('DASH','DoorDash Inc.','Consumer Cyclical','DASH','USD'),
('COIN','Coinbase Global Inc.','Financial Services','COIN','USD'),
('HOOD','Robinhood Markets Inc.','Financial Services','HOOD','USD')
ON CONFLICT ("symbol") DO UPDATE SET
  "companyName" = EXCLUDED."companyName",
  "sector" = EXCLUDED."sector",
  "quoteAsset" = EXCLUDED."quoteAsset";

-- Insert placeholder MarketQuote rows so the cache table has entries
INSERT INTO "MarketQuote" ("symbol","updatedAt")
SELECT "symbol", NOW() FROM "Stock"
ON CONFLICT ("symbol") DO NOTHING;
