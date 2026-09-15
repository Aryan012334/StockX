/**
 * Engine Test Factory
 *
 * Creates isolated Orderbook / Engine instances for unit testing without any
 * Redis, database, or filesystem dependencies.
 *
 * Updated to use the new matcher-service paths and string UUID order IDs
 * (Snowflake IDs were removed in the CortexCookie refactor).
 */

import { randomUUID } from "crypto";
import { Orderbook }  from "../../packages/matcher-service/src/trade/Orderbook.js";
import type {
  Order,
  Fill,
} from "../../packages/matcher-service/src/trade/Orderbook.js";

export type { Order, Fill };
export { Orderbook };

/**
 * Generates a unique string UUID for test orders.
 * Replaces the old Snowflake bigint generator — order IDs are now UUID strings.
 */
export function generateOrderId(): string {
  return randomUUID();
}

// ---------------------------------------------------------------------------
// Balance types (mirrors Engine internals)
// ---------------------------------------------------------------------------

export interface AssetBalance {
  available: number;
  locked:    number;
}

export interface UserBalances {
  [asset: string]: AssetBalance;
}

// ---------------------------------------------------------------------------
// TestEngine
// Isolated replica of the Engine class for unit tests.
// No Redis, no Prisma, no filesystem — pure in-memory.
// ---------------------------------------------------------------------------

export class TestEngine {
  private orderbooks: Map<string, Orderbook> = new Map();
  private balances:   Map<string, UserBalances> = new Map();

  constructor(markets: string[] = ["RIL_INR", "TATA_INR", "SOL_INR"]) {
    for (const market of markets) {
      this.orderbooks.set(market, new Orderbook(market));
    }
  }

  addUser(userId: string, balances: Record<string, number> = { INR: 100000 }): void {
    const ub: UserBalances = {};
    for (const [asset, amount] of Object.entries(balances)) {
      ub[asset] = { available: amount, locked: 0 };
    }
    this.balances.set(userId, ub);
  }

  getUserBalance(userId: string): UserBalances | undefined {
    return this.balances.get(userId);
  }

  getOrderbook(market: string): Orderbook | undefined {
    return this.orderbooks.get(market);
  }

  private parseMarket(market: string): { baseAsset: string; quoteAsset: string } {
    const [base, quote] = market.split("_");
    if (!base || !quote) throw new Error(`Invalid market: ${market}`);
    return { baseAsset: base, quoteAsset: quote };
  }

  private lockFunds(
    baseAsset: string,
    quoteAsset: string,
    side: "buy" | "sell",
    userId: string,
    price: number,
    quantity: number,
  ): void {
    const wallet = this.balances.get(userId);
    if (!wallet) throw new Error("User wallet not initialized");

    if (!Number.isFinite(quantity) || quantity <= 0) throw new Error(`Invalid quantity: ${quantity}`);
    if (!Number.isFinite(price)    || price    <= 0) throw new Error(`Invalid price: ${price}`);

    if (side === "buy") {
      const cost  = quantity * price;
      const asset = wallet[quoteAsset];
      if (!asset)              throw new Error(`User does not hold: ${quoteAsset}`);
      if (asset.available < cost) throw new Error("Insufficient Funds");
      asset.available -= cost;
      asset.locked    += cost;
    } else {
      const asset = wallet[baseAsset];
      if (!asset)                   throw new Error(`User does not hold: ${baseAsset}`);
      if (asset.available < quantity) throw new Error(`Insufficient ${baseAsset} qty for this sell order`);
      asset.available -= quantity;
      asset.locked    += quantity;
    }
  }

  private updateBalance(
    userId: string,
    baseAsset: string,
    quoteAsset: string,
    side: "buy" | "sell",
    fills: Fill[],
  ): void {
    const uw = this.balances.get(userId);
    if (!uw) throw new Error(`User wallet ${userId} not initialized`);
    if (!uw[baseAsset])  uw[baseAsset]  = { available: 0, locked: 0 };
    if (!uw[quoteAsset]) uw[quoteAsset] = { available: 0, locked: 0 };

    for (const fill of fills) {
      const mw = this.balances.get(fill.otherUserId);
      if (!mw) throw new Error(`Counter-party wallet ${fill.otherUserId} not found`);
      if (!mw[baseAsset])  mw[baseAsset]  = { available: 0, locked: 0 };
      if (!mw[quoteAsset]) mw[quoteAsset] = { available: 0, locked: 0 };

      const cost = fill.qty * fill.price;
      if (side === "buy") {
        uw[quoteAsset]!.locked    -= cost;
        uw[baseAsset]!.available  += fill.qty;
        mw[baseAsset]!.locked     -= fill.qty;
        mw[quoteAsset]!.available += cost;
      } else {
        uw[baseAsset]!.locked     -= fill.qty;
        uw[quoteAsset]!.available += cost;
        mw[quoteAsset]!.locked    -= cost;
        mw[baseAsset]!.available  += fill.qty;
      }
    }
  }

  private reconcile(
    userId: string,
    baseAsset: string,
    quoteAsset: string,
    side: "buy" | "sell",
    price: number,
    executedQty: number,
    remainingQty: number,
    restingOnBook: boolean,
    fills: Fill[],
  ): void {
    const w = this.balances.get(userId);
    if (!w) return;

    if (side === "buy") {
      const surplus    = executedQty * price - fills.reduce((s, f) => s + f.qty * f.price, 0);
      const unrestored = restingOnBook ? 0 : remainingQty * price;
      const release    = surplus + unrestored;
      if (release > 0 && w[quoteAsset]) {
        w[quoteAsset]!.locked    -= release;
        w[quoteAsset]!.available += release;
      }
    } else {
      if (!restingOnBook && remainingQty > 0 && w[baseAsset]) {
        w[baseAsset]!.locked    -= remainingQty;
        w[baseAsset]!.available += remainingQty;
      }
    }
  }

  createOrder(params: {
    market:        string;
    price:         number;
    quantity:      number;
    side:          "buy" | "sell";
    userId:        string;
    orderId?:      string;
    orderType?:    "limit" | "market";
    executionType?: "ioc";
  }): {
    executedQty:   number;
    fills:         Fill[];
    orderId:       string;
    remainingQty:  number;
    restingOnBook: boolean;
  } {
    const {
      market, price, quantity, side, userId,
      orderId = generateOrderId(),
      orderType = "limit",
      executionType,
    } = params;

    const { baseAsset, quoteAsset } = this.parseMarket(market);
    const ob = this.orderbooks.get(market);
    if (!ob) throw new Error("No orderbook found");

    this.lockFunds(baseAsset, quoteAsset, side, userId, price, quantity);

    const order: Omit<Order, "seq"> = { price, quantity, orderId, filled: 0, side, userId };
    const shouldRest = orderType === "limit" && executionType !== "ioc";
    const { fills, executedQty } = ob.addOrder(order, { rest: shouldRest });

    this.updateBalance(userId, baseAsset, quoteAsset, side, fills);

    const remainingQty  = quantity - executedQty;
    const restingOnBook = shouldRest && remainingQty > 0;

    this.reconcile(userId, baseAsset, quoteAsset, side, price, executedQty, remainingQty, restingOnBook, fills);

    return { executedQty, fills, orderId, remainingQty, restingOnBook };
  }

  cancelOrder(market: string, orderId: string): { success: boolean; error?: string } {
    const { baseAsset, quoteAsset } = this.parseMarket(market);
    const ob = this.orderbooks.get(market);
    if (!ob) return { success: false, error: "No orderbook found" };

    const order =
      ob.asks.find((o) => o.orderId === orderId) ??
      ob.bids.find((o) => o.orderId === orderId);

    if (!order) return { success: false, error: "No order found" };

    const w = this.balances.get(order.userId);
    if (!w)   return { success: false, error: "User wallet not found" };

    if (order.side === "buy") {
      ob.cancelBid(orderId);
      const rem = order.quantity - order.filled;
      if (w[quoteAsset]) {
        w[quoteAsset]!.available += rem * order.price;
        w[quoteAsset]!.locked    -= rem * order.price;
      }
    } else {
      ob.cancelAsk(orderId);
      const rem = order.quantity - order.filled;
      if (w[baseAsset]) {
        w[baseAsset]!.available += rem;
        w[baseAsset]!.locked    -= rem;
      }
    }
    return { success: true };
  }

  getDepth(market: string) {
    return this.orderbooks.get(market)?.getDepth();
  }

  getTotalSystemBalances(): Record<string, { available: number; locked: number; total: number }> {
    const totals: Record<string, { available: number; locked: number; total: number }> = {};
    for (const ub of this.balances.values()) {
      for (const [asset, ab] of Object.entries(ub)) {
        if (!totals[asset]) totals[asset] = { available: 0, locked: 0, total: 0 };
        totals[asset]!.available += ab.available;
        totals[asset]!.locked    += ab.locked;
        totals[asset]!.total     += ab.available + ab.locked;
      }
    }
    return totals;
  }
}

// ---------------------------------------------------------------------------
// createTestOrder — helper for Orderbook-only tests
// ---------------------------------------------------------------------------

export function createTestOrder(
  overrides: Partial<Omit<Order, "seq">> & { side: "buy" | "sell" },
): Omit<Order, "seq"> {
  return {
    price:    100,
    quantity: 10,
    orderId:  generateOrderId(),
    filled:   0,
    userId:   "test-user",
    ...overrides,
  };
}
