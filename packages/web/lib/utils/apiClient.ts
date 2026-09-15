import axios from "axios";
import type {
  DepthUpdateMessage,
  Trade,
  Ticker,
  Stock,
  OrderRecord,
  EngineRequest,
  EngineResponse,
} from "@stockx/shared";

export type CreateOrderPayload = Extract<EngineRequest, { type: "CREATE_ORDER" }>["data"];
export type OrderPlacedResponse = Extract<EngineResponse, { type: "ORDER_PLACED" }>["payload"];

const BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_URL ?? "http://localhost:3001/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

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
// Price Service
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

/**
 * Returns recent trades for a symbol — used by the chart to build candles
 * and by the sparkline on the markets page.
 */
export async function getPriceHistory(symbol: string, limit = 500): Promise<Trade[]> {
  const { data } = await api.get<Trade[]>(`/price/history/${symbol}`, { params: { limit } });
  return data;
}

// ---------------------------------------------------------------------------
// Order book depth (live, from Matcher Service)
// ---------------------------------------------------------------------------

export async function getDepth(symbol: string): Promise<DepthUpdateMessage["data"] & { symbol: string }> {
  const { data } = await api.get(`/depth`, { params: { symbol } });
  return data;
}

// ---------------------------------------------------------------------------
// Trade feed (settled trades from Execution Service DB)
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

export async function getOpenOrders(
  userId: string,
  symbol: string,
): Promise<Extract<EngineResponse, { type: "OPEN_ORDERS" }>["payload"]> {
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
