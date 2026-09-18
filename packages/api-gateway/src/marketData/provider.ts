// ---------------------------------------------------------------------------
// MarketDataProvider — abstraction layer for EXTERNAL reference market data
//
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  ARCHITECTURE BOUNDARY — READ BEFORE MODIFYING                         ║
// ║                                                                         ║
// ║  This module is ONLY responsible for:                                   ║
// ║    • Fetching reference prices from an external provider (Twelve Data)  ║
// ║    • Caching those prices in Redis and the MarketQuote table            ║
// ║    • Providing OHLCV candle data for charting                           ║
// ║                                                                         ║
// ║  It is NOT responsible for:                                             ║
// ║    • Which stocks are listed on StockX  → Stock table (stock admin)     ║
// ║    • Order matching                     → Matcher Service               ║
// ║    • Fill prices                        → Orderbook / Engine            ║
// ║    • Portfolio holdings                 → Execution Service             ║
// ║    • StockX simulated trade prices      → Trade table / Price routes    ║
// ║                                                                         ║
// ║  The external provider is a data source, not an authority.              ║
// ║  It can be swapped, paused, or replaced without affecting trading.      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
//
// Current implementation: Twelve Data (https://twelvedata.com)
// Free tier: 800 API credits/day, 8 credits/minute
//
// Caching strategy (to stay within free-tier limits):
//   • Batch quote refresh: every 15 min for ALL listed stocks — 1 API call
//     (Twelve Data batch endpoint accepts comma-separated symbols)
//   • Individual on-demand: Redis TTL 60 s → DB fallback
//   • Historical candles:   Redis TTL 5 min per symbol+interval
//   • Provider failure:     return last DB-cached value, never fabricate
// ---------------------------------------------------------------------------

import { createClient } from "redis";
import type { RedisClientType } from "redis";
import { prisma } from "@stockx/execution-service";

const TWELVE_DATA_BASE  = "https://api.twelvedata.com";
const REDIS_URL         = process.env.REDIS_URL ?? "redis://redis:6379";
const API_KEY           = process.env.TWELVE_DATA_API_KEY ?? "";

const QUOTE_TTL_SECS    = 60;               // Redis TTL — individual quote
const CANDLE_TTL_SECS   = 300;             // Redis TTL — candles (5 min)
const BATCH_INTERVAL_MS = 15 * 60 * 1000; // Batch refresh interval (15 min)

export interface MarketQuoteData {
  symbol:        string;
  price:         number;
  previousClose: number;
  open:          number;
  dayHigh:       number;
  dayLow:        number;
  volume:        number;
  change:        number;
  changePercent: number;
  isDelayed:     boolean;
  updatedAt:     string; // ISO-8601
}

export interface OhlcCandle {
  time:   number; // Unix seconds (UTC)
  open:   number;
  high:   number;
  low:    number;
  close:  number;
  volume: number;
}

// ---------------------------------------------------------------------------
// Redis connection
// ---------------------------------------------------------------------------

let _redis: RedisClientType | null = null;

async function getRedis(): Promise<RedisClientType> {
  if (_redis && _redis.isOpen) return _redis;
  _redis = createClient({ url: REDIS_URL }) as RedisClientType;
  _redis.on("error", (e) => console.error("[MarketData] Redis error:", e));
  await _redis.connect();
  return _redis;
}

const quoteKey  = (sym: string) => `mq:${sym}`;
const candleKey = (sym: string, iv: string) => `mc:${sym}:${iv}`;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, { signal: AbortSignal.timeout(8_000) });
  if (!res.ok) throw new Error(`[MarketData] HTTP ${res.status} from provider`);
  return res.json();
}

function parseQuote(symbol: string, data: any): MarketQuoteData | null {
  if (!data || data.status === "error" || !data.close) return null;
  const price     = parseFloat(data.close) || 0;
  const prevClose = parseFloat(data.previous_close) || price;
  const change    = price - prevClose;
  return {
    symbol,
    price,
    previousClose: prevClose,
    open:          parseFloat(data.open)   || price,
    dayHigh:       parseFloat(data.high)   || price,
    dayLow:        parseFloat(data.low)    || price,
    volume:        parseFloat(data.volume) || 0,
    change:        parseFloat(change.toFixed(4)),
    changePercent: prevClose > 0 ? parseFloat(((change / prevClose) * 100).toFixed(4)) : 0,
    isDelayed:     false,
    updatedAt:     new Date().toISOString(),
  };
}

/** Persist a reference quote to the MarketQuote cache table. */
async function persistQuote(q: MarketQuoteData): Promise<void> {
  try {
    await prisma.marketQuote.upsert({
      where:  { symbol: q.symbol },
      create: { ...q, updatedAt: new Date(q.updatedAt) },
      update: { ...q, symbol: undefined, updatedAt: new Date(q.updatedAt) },
    });
  } catch (err) {
    console.error(`[MarketData] Failed to persist quote for ${q.symbol}:`, err);
  }
}

/** Read last cached quote from MarketQuote DB table. */
async function quoteFromDb(symbol: string): Promise<MarketQuoteData | null> {
  try {
    const row = await prisma.marketQuote.findUnique({ where: { symbol } });
    if (!row || Number(row.price) === 0) return null;
    return {
      symbol,
      price:         Number(row.price),
      previousClose: Number(row.previousClose),
      open:          Number(row.open),
      dayHigh:       Number(row.dayHigh),
      dayLow:        Number(row.dayLow),
      volume:        Number(row.volume),
      change:        Number(row.change),
      changePercent: Number(row.changePercent),
      isDelayed:     row.isDelayed,
      updatedAt:     row.updatedAt.toISOString(),
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get reference market quote for a single symbol.
 *
 * Resolution order:
 *   1. Redis cache (60 s TTL)
 *   2. Twelve Data live fetch (if API key is set)
 *   3. DB-cached value (stale, marked isDelayed=true)
 *   4. null — no data available
 *
 * NOTE: The returned price is a REFERENCE price from an external provider.
 *       It is NOT the StockX simulated trade price.
 *       It does NOT affect order matching or portfolio values.
 */
export async function getQuote(symbol: string): Promise<MarketQuoteData | null> {
  const redis = await getRedis();
  const key   = quoteKey(symbol);

  // 1. Redis cache
  const cached = await redis.get(key);
  if (cached) {
    try { return JSON.parse(cached); } catch {}
  }

  // 2. Live fetch from provider
  if (API_KEY) {
    try {
      const data = await fetchJson(
        `${TWELVE_DATA_BASE}/quote?symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`,
      );
      const q = parseQuote(symbol, data);
      if (q) {
        await redis.setEx(key, QUOTE_TTL_SECS, JSON.stringify(q));
        await persistQuote(q);
        return q;
      }
    } catch (err) {
      console.warn(`[MarketData] Live quote failed for ${symbol}:`, err);
    }
  }

  // 3. DB fallback
  const dbq = await quoteFromDb(symbol);
  if (dbq) return { ...dbq, isDelayed: true };

  return null;
}

/**
 * Batch refresh reference quotes for all StockX-listed stocks.
 *
 * IMPORTANT: The list of symbols is read from the StockX Stock catalog
 * (prisma.stock). The external provider does NOT control which stocks
 * are listed — it only provides price data for symbols we ask it about.
 *
 * Called on a 15-minute schedule to stay within free-tier API limits.
 * Uses Twelve Data batch endpoint (one API call for all symbols).
 */
export async function batchRefreshAllQuotes(): Promise<void> {
  if (!API_KEY) {
    console.log("[MarketData] No TWELVE_DATA_API_KEY — batch refresh skipped");
    return;
  }

  // Read the authoritative stock list from StockX's own catalog
  let stocks: { symbol: string }[] = [];
  try {
    stocks = await prisma.stock.findMany({
      where:  { status: "ACTIVE" },
      select: { symbol: true },
    });
  } catch (err) {
    console.error("[MarketData] Failed to read stock catalog:", err);
    return;
  }

  if (stocks.length === 0) return;

  // Free tier: 8 API credits per minute, 800 per day.
  // Each symbol in a batch = 1 credit. So max 8 symbols per call.
  // Strategy: rotate through all stocks 8 at a time on each 15-min tick.
  // 153 stocks ÷ 8 = ~20 chunks → full refresh in ~20 × 15 min = ~5 hours.
  // Redis TTL keeps prices fresh; DB stores last seen value permanently.

  const CHUNK_SIZE = 8;
  const redis      = await getRedis();

  // Build chunks
  const chunks: string[][] = [];
  for (let i = 0; i < stocks.length; i += CHUNK_SIZE) {
    chunks.push(stocks.slice(i, i + CHUNK_SIZE).map((s) => s.symbol));
  }

  // Rotate: process one chunk per call, track index in Redis
  const chunkIdxKey = "mq:batch:chunk_idx";
  const idxStr      = await redis.get(chunkIdxKey);
  const chunkIdx    = idxStr ? (parseInt(idxStr) % chunks.length) : 0;
  const chunk       = chunks[chunkIdx]!;
  await redis.set(chunkIdxKey, String((chunkIdx + 1) % chunks.length));

  const symbolStr = chunk.join(",");
  console.log(`[MarketData] Refreshing chunk ${chunkIdx + 1}/${chunks.length} (${symbolStr})`);

  try {
    const data = await fetchJson(
      `${TWELVE_DATA_BASE}/quote?symbol=${encodeURIComponent(symbolStr)}&apikey=${API_KEY}`,
    );

    // Single-symbol response differs from batch
    const results: Record<string, any> = chunk.length === 1
      ? { [chunk[0]!]: data }
      : data;

    let updated = 0;
    for (const [sym, raw] of Object.entries(results)) {
      const q = parseQuote(sym, raw);
      if (q) {
        await redis.setEx(quoteKey(sym), QUOTE_TTL_SECS, JSON.stringify(q));
        await persistQuote(q);
        updated++;
      }
    }
    console.log(`[MarketData] Chunk ${chunkIdx + 1} done: ${updated}/${chunk.length} updated`);
  } catch (err) {
    console.error("[MarketData] Batch refresh failed:", err);
  }
}

/**
 * Get OHLCV candle data for charting.
 *
 * NOTE: These are REFERENCE candles from the external provider.
 *       They are used only for chart display.
 *       They do NOT affect order prices, fills, or P&L calculations.
 *
 * interval: "1min"|"5min"|"15min"|"30min"|"1h"|"4h"|"1day"|"1week"
 */
export async function getHistoricalCandles(
  symbol:     string,
  interval:   string,
  outputsize: number = 90,
): Promise<OhlcCandle[]> {
  const redis = await getRedis();
  const key   = candleKey(symbol, interval);

  // Redis cache
  const cached = await redis.get(key);
  if (cached) {
    try { return JSON.parse(cached); } catch {}
  }

  // Live fetch
  if (API_KEY) {
    try {
      const data = await fetchJson(
        `${TWELVE_DATA_BASE}/time_series?symbol=${encodeURIComponent(symbol)}&interval=${interval}&outputsize=${outputsize}&apikey=${API_KEY}`,
      );
      if (data?.values && Array.isArray(data.values)) {
        const candles: OhlcCandle[] = data.values
          .map((v: any) => ({
            time:   Math.floor(new Date(v.datetime).getTime() / 1000),
            open:   parseFloat(v.open),
            high:   parseFloat(v.high),
            low:    parseFloat(v.low),
            close:  parseFloat(v.close),
            volume: parseFloat(v.volume ?? "0"),
          }))
          .filter((c: OhlcCandle) => !isNaN(c.close) && c.close > 0)
          .reverse(); // oldest first for charting

        if (candles.length > 0) {
          await redis.setEx(key, CANDLE_TTL_SECS, JSON.stringify(candles));
          return candles;
        }
      }
    } catch (err) {
      console.warn(`[MarketData] Candles failed for ${symbol}/${interval}:`, err);
    }
  }

  return [];
}

/** Get reference quotes for multiple symbols (cached per symbol). */
export async function getQuotes(symbols: string[]): Promise<MarketQuoteData[]> {
  const results = await Promise.all(symbols.map((s) => getQuote(s)));
  return results.filter((q): q is MarketQuoteData => q !== null);
}

/**
 * Start the background market data refresh loop.
 * Called ONCE at api-gateway startup.
 *
 * The refresh loop reads the StockX stock catalog to determine
 * which symbols to fetch — it does NOT add or remove stocks.
 */
export function startMarketDataRefreshLoop(): void {
  batchRefreshAllQuotes().catch(console.error);
  setInterval(() => batchRefreshAllQuotes().catch(console.error), BATCH_INTERVAL_MS);
  console.log(`[MarketData] Refresh loop started — interval: ${BATCH_INTERVAL_MS / 60_000} min`);
}
