export * from "./engineEvents.js";
export * from "./engineProtocol.js";
export * from "./wsMessages.js";
export * from "./dbMessages.js";
export * from "./webUI.js";

export const BASE_CURRENCY = "INR";
export const SUPPORTED_SYMBOLS = ["RIL", "TATA", "SOL"] as const;
export type SupportedSymbol = (typeof SUPPORTED_SYMBOLS)[number];
