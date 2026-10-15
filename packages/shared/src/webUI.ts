// Shapes consumed by the Next.js frontend

// ---------------------------------------------------------------------------
// Trade (settled SimX trade — from our matching engine)
// ---------------------------------------------------------------------------
export interface Trade {
  id: string;
  symbol: string;
  isBuyerMaker: boolean;
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;       // epoch ms
}

// ---------------------------------------------------------------------------
// Ticker (derived from our Trade table — StockX simulated prices)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// MarketQuote (reference price from external provider — Twelve Data)
// ---------------------------------------------------------------------------
export interface MarketQuote {
  symbol:        string;
  companyName?:  string;
  sector?:       string;
  quoteAsset?:   string;
  price:         number | null;
  previousClose: number | null;
  open:          number | null;
  dayHigh:       number | null;
  dayLow:        number | null;
  volume:        number | null;
  change:        number | null;
  changePercent: number | null;
  isDelayed:     boolean;
  updatedAt:     string | null;
}

// ---------------------------------------------------------------------------
// Stock metadata
// ---------------------------------------------------------------------------
export interface Stock {
  symbol:      string;
  companyName: string;
  sector:      string | null;
  quoteAsset:  string;
  status:      "ACTIVE" | "DELISTED";
}

// ---------------------------------------------------------------------------
// Order record (from Order table)
// ---------------------------------------------------------------------------
export interface OrderRecord {
  id:              string;
  exchangeOrderId: string | null;
  userId:          string;
  symbol:          string;
  side:            "buy" | "sell";
  orderType:       "limit" | "market";
  price:           string;
  quantity:        string;
  filledQty:       string;
  remainingQty:    string;
  averageFillPrice: string;
  status:          "OPEN" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED" | "EXPIRED";
  createdAt:       string;
}

// ---------------------------------------------------------------------------
// Holding record (user position with P&L)
// ---------------------------------------------------------------------------
export interface HoldingRecord {
  symbol:           string;
  companyName:      string;
  sector:           string | null;
  quantity:         number;
  lockedQuantity:   number;
  availableQty:     number;
  averageCost:      number;
  currentPrice:     number | null;
  invested:         number;
  currentValue:     number | null;
  unrealizedPnl:    number | null;
  unrealizedPnlPct: number | null;
  realizedPnl:      number;
  isDelayed:        boolean;
  updatedAt:        string | null;
}

// ---------------------------------------------------------------------------
// OHLCV candle (for charting)
// ---------------------------------------------------------------------------
export interface OhlcCandle {
  time:   number;  // Unix seconds
  open:   number;
  high:   number;
  low:    number;
  close:  number;
  volume: number;
}
