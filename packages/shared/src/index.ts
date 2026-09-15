export * from "./engineEvents.js";
export * from "./engineProtocol.js";
export * from "./wsMessages.js";
export * from "./dbMessages.js";
export * from "./webUI.js";

export const BASE_CURRENCY = "INR";
export const SUPPORTED_SYMBOLS = ["RIL", "TATA", "SOL"] as const;
export type SupportedSymbol = (typeof SUPPORTED_SYMBOLS)[number];

// All symbol-specific queue names for the Matcher to listen on at startup
export function allSymbolQueues(): string[] {
  const queues: string[] = [];
  for (const sym of SUPPORTED_SYMBOLS) {
    const ticker = `${sym}_${BASE_CURRENCY}`;
    queues.push(`orders:${ticker}:buy`, `orders:${ticker}:sell`);
  }
  return queues;
}
