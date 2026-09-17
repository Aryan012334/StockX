import axios from "axios";
import type {
  Trade,
  Ticker,
  MarketQuote,
  Stock,
  OrderRecord,
  HoldingRecord,
  OhlcCandle,
  EngineRequest,
  EngineResponse,
} from "@stockx/shared";

export type CreateOrderPayload = Extract<EngineRequest, { type: "CREATE_ORDER" }>["data"];
export type OrderPlacedResponse = Extract<EngineResponse, { type: "ORDER_PLACED" }>["payload"];

const BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_URL ?? "http://localhost:13001/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// ---------------------------------------------------------------------------
// Market Data (reference prices from external provider)
// ---------------------------------------------------------------------------

/** All active stocks with cached market quotes — used by Markets page */
export async function getMarketQuotes(): Promise<MarketQuote[]> {
  try {
    const { data } = await api.get<MarketQuote[]>("/market/quotes");
    return data;
  } catch {
    return [];
  }
}

/** Single stock market quote */
export async function getMarketQuote(symbol: string): Promise<MarketQuote | null> {
  try {
    const { data } = await api.get<MarketQuote>(`/market/quotes/${symbol}`);
    return data;
  } catch {
    return null;
  }
}

/** OHLCV candles for charting — from Twelve Data */
export async function getCandles(
  symbol: string,
  interval: string = "1day",
  outputsize: number = 90,
): Promise<OhlcCandle[]> {
  try {
    const { data } = await api.get<OhlcCandle[]>(`/market/candles/${symbol}`, {
      params: { interval, outputsize },
    });
    return data;
  } catch {
    return [];
  }
}

/** Search stocks by name or symbol */
export async function searchStocks(q: string): Promise<MarketQuote[]> {
  if (!q.trim()) return [];
  try {
    const { data } = await api.get<MarketQuote[]>("/market/search", { params: { q } });
    return data;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Stock Service
// ---------------------------------------------------------------------------

export async function getStocks(): Promise<Stock[]> {
  const { data } = await api.get<Stock[]>("/stocks");
  return data;
}

export async function getStock(symbol: string): Promise<Stock> {
  const { data } = await api.get<Stock>(`/stocks/${symbol}`);
  return data;
}

// ---------------------------------------------------------------------------
// Price Service (StockX simulated trade prices)
// ---------------------------------------------------------------------------

export async function getTickers(): Promise<Ticker[]> {
  try {
    const { data } = await api.get<Ticker[]>("/price/tickers");
    return data;
  } catch {
    return [];
  }
}

export async function getTicker(symbol: string): Promise<Ticker> {
  const { data } = await api.get<Ticker[]>("/price/tickers", { params: { symbol } });
  if (!data.length) throw new Error(`No ticker data for ${symbol}`);
  return data[0]!;
}

/** Recent trades from StockX matching engine (for sparklines / trade feed) */
export async function getPriceHistory(symbol: string, limit = 500): Promise<Trade[]> {
  const { data } = await api.get<Trade[]>(`/price/history/${symbol}`, { params: { limit } });
  return data;
}

// ---------------------------------------------------------------------------
// Order book depth
// ---------------------------------------------------------------------------

export async function getDepth(symbol: string) {
  const { data } = await api.get(`/depth`, { params: { symbol } });
  return data;
}

// ---------------------------------------------------------------------------
// Trade feed
// ---------------------------------------------------------------------------

export async function getTrades(symbol: string, limit = 50): Promise<Trade[]> {
  const { data } = await api.get<Trade[]>("/trades", { params: { symbol, limit } });
  return data;
}

// ---------------------------------------------------------------------------
// Order Service
// ---------------------------------------------------------------------------

export async function placeOrder(payload: CreateOrderPayload): Promise<OrderPlacedResponse> {
  const { data } = await api.post<OrderPlacedResponse>("/order", payload, { timeout: 20_000 });
  return data;
}

export async function cancelOrder(orderId: string, symbol: string): Promise<void> {
  await api.delete("/order", { data: { orderId, symbol } });
}

export async function getOpenOrders(userId: string, symbol: string) {
  const { data } = await api.get("/order/open", { params: { userId, symbol } });
  return data;
}

export async function getOrderHistory(
  userId: string,
  symbol?: string,
  limit = 50,
): Promise<OrderRecord[]> {
  const { data } = await api.get<OrderRecord[]>("/order/history", {
    params: { userId, ...(symbol ? { symbol } : {}), limit },
  });
  return data;
}

// ---------------------------------------------------------------------------
// Holdings & Portfolio
// ---------------------------------------------------------------------------

export async function getHoldings(userId: string): Promise<HoldingRecord[]> {
  const { data } = await api.get<HoldingRecord[]>("/holdings", { params: { userId } });
  return data;
}

export interface WalletSummary {
  balance: number;
  lockedBalance: number;
  availableCash: number;
}

export async function getWalletSummary(userId: string): Promise<WalletSummary> {
  const { data } = await api.get<WalletSummary>("/wallet/me", { params: { userId } });
  return data;
}

export async function deposit(userId: string, amount: number) {
  const { data } = await api.post("/wallet/deposit", { userId, amount });
  return data;
}

export async function withdraw(userId: string, amount: number) {
  const { data } = await api.post("/wallet/withdraw", { userId, amount });
  return data;
}

// ---------------------------------------------------------------------------
// Watchlist
// ---------------------------------------------------------------------------

export async function getWatchlist(userId: string): Promise<MarketQuote[]> {
  const { data } = await api.get<MarketQuote[]>("/watchlist", { params: { userId } });
  return data;
}

export async function addToWatchlist(userId: string, symbol: string) {
  await api.post("/watchlist", { userId, symbol });
}

export async function removeFromWatchlist(userId: string, symbol: string) {
  await api.delete(`/watchlist/${symbol}`, { data: { userId } });
}
