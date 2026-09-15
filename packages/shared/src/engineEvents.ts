// ---------------------------------------------------------------------------
// Matcher Service → API Gateway (request types)
// ---------------------------------------------------------------------------
export const CREATE_ORDER    = "CREATE_ORDER";
export const CANCEL_ORDER    = "CANCEL_ORDER";
export const GET_DEPTH       = "GET_DEPTH";
export const GET_OPEN_ORDERS = "GET_OPEN_ORDERS";
export const ADD_USER        = "ADD_USER";
export const ON_RAMP         = "ON_RAMP";

// ---------------------------------------------------------------------------
// Matcher Service → API Gateway (response types)
// ---------------------------------------------------------------------------
export const ORDER_PLACED    = "ORDER_PLACED";
export const ORDER_CANCELLED = "ORDER_CANCELLED";
export const OPEN_ORDERS     = "OPEN_ORDERS";
export const DEPTH           = "DEPTH";
export const NEW_USER        = "NEW_USER";

// ---------------------------------------------------------------------------
// Matcher Service → Execution Service (via Redis queue)
// ---------------------------------------------------------------------------
export const MATCH_CREATED = "MATCH_CREATED";
export const ORDER_UPDATE  = "ORDER_UPDATE";

// ---------------------------------------------------------------------------
// WebSocket stream event types (Matcher → Realtime Service → Browser)
// ---------------------------------------------------------------------------
export const SUBSCRIBE   = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

// ---------------------------------------------------------------------------
// Redis queue / channel name helpers
//
// CortexCookie architecture uses symbol-specific queues so orders for each
// symbol are processed by one authoritative order book with no cross-symbol
// interference.
//
// Queue layout:
//   orders:<SYMBOL>:buy   — BUY orders for a symbol  (API Gateway → Matcher)
//   orders:<SYMBOL>:sell  — SELL orders for a symbol (API Gateway → Matcher)
//   exchange:control      — Non-order messages: CANCEL, GET_DEPTH, etc.
//   matches               — MATCH_CREATED events     (Matcher → Execution)
//   order_updates         — ORDER_UPDATE events      (Matcher → Execution)
// ---------------------------------------------------------------------------
export function buyQueueName(symbol: string):  string { return `orders:${symbol}:buy`; }
export function sellQueueName(symbol: string): string { return `orders:${symbol}:sell`; }

export const EXCHANGE_CONTROL_QUEUE = "exchange:control";
export const MATCHES_QUEUE          = "matches";
export const ORDER_UPDATES_QUEUE    = "order_updates";
