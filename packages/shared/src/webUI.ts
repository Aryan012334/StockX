// Shapes consumed by the Next.js frontend

export interface Trade {
  id: string;
  symbol: string;
  isBuyerMaker: boolean;
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;       // epoch ms
}

export interface Ticker {
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
  high: string;
  low: string;
  volume: string;
  firstPrice: string;
}

export interface Stock {
  symbol: string;
  companyName: string;
  quoteAsset: string;
  status: "ACTIVE" | "DELISTED";
}

export interface OrderRecord {
  id: string;
  userId: string;
  symbol: string;
  side: "buy" | "sell";
  orderType: "limit" | "market";
  price: string;
  quantity: string;
  filledQty: string;
  remainingQty: string;
  status: "OPEN" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED" | "EXPIRED";
  createdAt: string;
}
