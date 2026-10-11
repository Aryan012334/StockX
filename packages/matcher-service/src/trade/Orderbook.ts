import { randomUUID } from "crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Order {
  price: number;
  quantity: number;
  orderId: string;       // UUID — set by api-gateway, passed through
  filled: number;
  side: "buy" | "sell";
  userId: string;
  // insertion sequence for time-priority within the same price level
  seq: number;
}

export interface Fill {
  matchId: string;       // UUID — unique per match event (idempotency key)
  price: number;
  qty: number;
  otherUserId: string;
  makerOrderId: string;
}

// ---------------------------------------------------------------------------
// Orderbook
// In-memory price-time priority order book for a single symbol.
//
// BUY  side: highest price first, then earliest seq first (max-heap semantics)
// SELL side: lowest price first,  then earliest seq first (min-heap semantics)
//
// Orders are inserted in sorted position so every match runs in O(n) without
// a re-sort, satisfying price-time priority correctly at each step.
// ---------------------------------------------------------------------------

let globalSeq = 0;

export class Orderbook {
  bids: Order[] = [];     // sorted: best (highest) price first
  asks: Order[] = [];     // sorted: best (lowest) price first
  readonly symbol: string;
  currentPrice: number;

  constructor(symbol: string, currentPrice = 0) {
    this.symbol = symbol;
    this.currentPrice = currentPrice;
  }

  // -------------------------------------------------------------------------
  // Insert helpers — maintain sorted order at insertion time
  // -------------------------------------------------------------------------

  private insertBid(order: Order) {
    let i = 0;
    while (
      i < this.bids.length &&
      (this.bids[i]!.price > order.price ||
        (this.bids[i]!.price === order.price &&
          this.bids[i]!.seq < order.seq))
    ) {
      i++;
    }
    this.bids.splice(i, 0, order);
  }

  private insertAsk(order: Order) {
    let i = 0;
    while (
      i < this.asks.length &&
      (this.asks[i]!.price < order.price ||
        (this.asks[i]!.price === order.price &&
          this.asks[i]!.seq < order.seq))
    ) {
      i++;
    }
    this.asks.splice(i, 0, order);
  }

  // -------------------------------------------------------------------------
  // addOrder — entry point for CREATE_ORDER
  // -------------------------------------------------------------------------

  addOrder(
    order: Omit<Order, "seq">,
    options: { rest?: boolean } = {},
  ): { executedQty: number; fills: Fill[] } {
    const shouldRest = options.rest ?? true;

    const fullOrder: Order = { ...order, seq: ++globalSeq };

    if (fullOrder.side === "buy") {
      const { executedQty, fills } = this.matchBuyAgainstAsks(fullOrder);
      fullOrder.filled = executedQty;

      if (shouldRest && executedQty < fullOrder.quantity) {
        this.insertBid(fullOrder);
      }
      return { executedQty, fills };
    } else {
      const { executedQty, fills } = this.matchSellAgainstBids(fullOrder);
      fullOrder.filled = executedQty;

      if (shouldRest && executedQty < fullOrder.quantity) {
        this.insertAsk(fullOrder);
      }
      return { executedQty, fills };
    }
  }

  // -------------------------------------------------------------------------
  // Matching — buy taker walks asks (lowest first), sell taker walks bids (highest first)
  // -------------------------------------------------------------------------

  private matchBuyAgainstAsks(
    order: Order,
  ): { fills: Fill[]; executedQty: number } {
    const fills: Fill[] = [];
    let executedQty = 0;

    for (let i = 0; i < this.asks.length; ) {
      const ask = this.asks[i]!;

      // Price-priority: stop when the cheapest ask is still above buyer's limit
      if (ask.price > order.price) break;

      const remainingBuy = order.quantity - executedQty;
      const remainingAsk = ask.quantity - ask.filled;
      const filledQty    = Math.min(remainingBuy, remainingAsk);

      executedQty  += filledQty;
      ask.filled   += filledQty;

      fills.push({
        matchId:      randomUUID(),
        price:        ask.price,
        qty:          filledQty,
        otherUserId:  ask.userId,
        makerOrderId: ask.orderId,
      });

      // Remove fully-filled maker order
      if (ask.filled === ask.quantity) {
        this.asks.splice(i, 1);
      } else {
        i++;
      }

      if (executedQty === order.quantity) break;
    }

    return { fills, executedQty };
  }

  private matchSellAgainstBids(
    order: Order,
  ): { fills: Fill[]; executedQty: number } {
    const fills: Fill[] = [];
    let executedQty = 0;

    for (let i = 0; i < this.bids.length; ) {
      const bid = this.bids[i]!;

      // Price-priority: stop when the best bid is below the seller's limit
      if (bid.price < order.price) break;

      const remainingSell = order.quantity - executedQty;
      const remainingBid  = bid.quantity - bid.filled;
      const filledQty     = Math.min(remainingSell, remainingBid);

      executedQty  += filledQty;
      bid.filled   += filledQty;

      fills.push({
        matchId:      randomUUID(),
        price:        bid.price,
        qty:          filledQty,
        otherUserId:  bid.userId,
        makerOrderId: bid.orderId,
      });

      if (bid.filled === bid.quantity) {
        this.bids.splice(i, 1);
      } else {
        i++;
      }

      if (executedQty === order.quantity) break;
    }

    return { fills, executedQty };
  }

  // -------------------------------------------------------------------------
  // Depth snapshot — aggregated by price level
  // Returns bids sorted highest first, asks sorted lowest first.
  // -------------------------------------------------------------------------

  getDepth(): { bids: [string, string][]; asks: [string, string][] } {
    const bidsMap: Record<number, number> = {};
    const asksMap: Record<number, number> = {};

    for (const order of this.bids) {
      const rem = order.quantity - order.filled;
      if (rem > 0) bidsMap[order.price] = (bidsMap[order.price] ?? 0) + rem;
    }
    for (const order of this.asks) {
      const rem = order.quantity - order.filled;
      if (rem > 0) asksMap[order.price] = (asksMap[order.price] ?? 0) + rem;
    }

    const bids: [string, string][] = Object.entries(bidsMap)
      .map(([p, q]) => [p, q.toString()] as [string, string])
      .sort((a, b) => Number(b[0]) - Number(a[0]));

    const asks: [string, string][] = Object.entries(asksMap)
      .map(([p, q]) => [p, q.toString()] as [string, string])
      .sort((a, b) => Number(a[0]) - Number(b[0]));

    return { bids, asks };
  }

  // -------------------------------------------------------------------------
  // Utilities
  // -------------------------------------------------------------------------

  getOpenOrders(userId: string): Order[] {
    return [
      ...this.bids.filter((o) => o.userId === userId),
      ...this.asks.filter((o) => o.userId === userId),
    ];
  }

  cancelBid(orderId: string): number | undefined {
    const idx = this.bids.findIndex((o) => o.orderId === orderId);
    if (idx !== -1) {
      const price = this.bids[idx]!.price;
      this.bids.splice(idx, 1);
      return price;
    }
  }

  cancelAsk(orderId: string): number | undefined {
    const idx = this.asks.findIndex((o) => o.orderId === orderId);
    if (idx !== -1) {
      const price = this.asks[idx]!.price;
      this.asks.splice(idx, 1);
      return price;
    }
  }
}
