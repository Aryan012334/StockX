export * from "./engineEvents.js";
export * from "./engineProtocol.js";
export * from "./wsMessages.js";
export * from "./dbMessages.js";
export * from "./webUI.js";

export const BASE_CURRENCY = "USD";

// Queue name helpers — used by ExchangeGateway and Matcher
export function buyQueueNameFor(symbol: string):  string { return `orders:${symbol}:buy`; }
export function sellQueueNameFor(symbol: string): string { return `orders:${symbol}:sell`; }

export const EXCHANGE_CONTROL_QUEUE = "exchange:control";
export const MATCHES_QUEUE          = "matches";
export const ORDER_UPDATES_QUEUE    = "order_updates";

// allSymbolQueues: matcher now creates order books on demand for 150+ stocks.
// Returns empty array — matcher listens only on exchange:control at startup
// and adds symbol queues dynamically as orders arrive.
export function allSymbolQueues(): string[] { return []; }
