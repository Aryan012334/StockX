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
export const MATCH_CREATED = "MATCH_CREATED";   // renamed from TRADE_ADDED — clearer CortexCookie alignment
export const ORDER_UPDATE  = "ORDER_UPDATE";

// ---------------------------------------------------------------------------
// WebSocket stream event types (Matcher → Realtime Service → Browser)
// ---------------------------------------------------------------------------
export const SUBSCRIBE   = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";
