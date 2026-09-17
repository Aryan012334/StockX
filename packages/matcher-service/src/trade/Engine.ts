import { randomUUID } from "crypto";
import { prisma } from "@stockx/execution-service";
import { RedisManager } from "../redisClient.js";
import {
  MATCH_CREATED,
  ORDER_UPDATE,
  NEW_USER,
  OPEN_ORDERS,
  DEPTH,
  ORDER_PLACED,
  ORDER_CANCELLED,
  ON_RAMP,
  CREATE_ORDER,
  CANCEL_ORDER,
  GET_DEPTH,
  GET_OPEN_ORDERS,
  ADD_USER,
} from "@stockx/shared";
import type { EngineRequest } from "@stockx/shared";
import { Orderbook } from "./Orderbook.js";
import type { Fill, Order } from "./Orderbook.js";

// Local constant — base currency for the exchange
// Matches the quoteAsset used in the Stock table ("USD")
const BASE_CURRENCY = "USD";

// ---------------------------------------------------------------------------
// In-memory wallet structure
// Mirrors the Wallet table but is kept in memory for O(1) balance checks
// and fund locking during order placement.
//
// The Execution Service keeps the Postgres Wallet table eventually consistent.
// ---------------------------------------------------------------------------

interface AssetBalance {
  available: number;
  locked:    number;
}

interface UserBalance {
  [asset: string]: AssetBalance;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseSymbol(symbol: string): { baseAsset: string; quoteAsset: string } {
  const [baseAsset, quoteAsset] = symbol.split("_");
  if (!baseAsset || !quoteAsset) {
    throw new Error(`Invalid symbol format: "${symbol}". Expected BASE_QUOTE e.g. RIL_INR`);
  }
  return { baseAsset, quoteAsset };
}

function serializeOrder(order: Order) {
  return {
    orderId:     order.orderId,
    executedQty: order.filled,
    price:       order.price.toString(),
    quantity:    order.quantity.toString(),
    side:        order.side,
    userId:      order.userId,
  };
}

// ---------------------------------------------------------------------------
// Engine
//
// Responsibilities (CortexCookie Matcher Service):
//   - Maintain in-memory order books per symbol
//   - Load user wallet state from DB at startup
//   - Validate and lock funds before order placement
//   - Apply price-time priority matching (via Orderbook)
//   - Update in-memory wallet state after each fill
//   - Emit MATCH_CREATED events → Redis "db_processor" queue
//   - Emit ORDER_UPDATE events  → Redis "db_processor" queue
//   - Publish depth/trade updates → Redis pub/sub for Realtime Service
//   - Respond to API Gateway via per-request Redis channels
// ---------------------------------------------------------------------------

export class Engine {
  // One Orderbook per symbol, keyed by symbol ticker (e.g. "RIL_INR")
  private orderbookMap: Map<string, Orderbook> = new Map();

  // In-memory wallet: userId → { INR: {available, locked}, RIL: {available, locked}, ... }
  private balances: Map<string, UserBalance> = new Map();

  constructor() {
    // Order books are created on-demand when the first order arrives for a symbol.
    // This handles any number of stocks without needing to pre-define them.
    console.log("[Engine] Initialised — order books created on demand");
  }

  private getOrCreateOrderbook(symbol: string): Orderbook {
    let ob = this.orderbookMap.get(symbol);
    if (!ob) {
      ob = new Orderbook(symbol);
      this.orderbookMap.set(symbol, ob);
      console.log(`[Engine] Created order book for ${symbol}`);
    }
    return ob;
  }

  // -------------------------------------------------------------------------
  // Startup: load all wallets from Postgres into memory
  // -------------------------------------------------------------------------

  async loadAllWallets(): Promise<void> {
    try {
      const wallets = await prisma.wallet.findMany();
      this.balances.clear();
      for (const w of wallets) {
        this.loadWalletIntoMemory(w);
      }
      console.log(`[Engine] Loaded wallets for ${this.balances.size} users`);
    } catch (err) {
      console.error("[Engine] Failed to load wallets from DB:", err);
    }
  }

  loadWalletIntoMemory(wallet: {
    userId: string;
    balance: any;
    assetsHeld: any;
  }): void {
    const userBalance: UserBalance = {};

    userBalance[BASE_CURRENCY] = {
      available: Number(wallet.balance?.toString() ?? "0"),
      locked:    0,
    };

    if (wallet.assetsHeld) {
      const assets =
        typeof wallet.assetsHeld === "string"
          ? JSON.parse(wallet.assetsHeld)
          : wallet.assetsHeld;

      for (const [ticker, val] of Object.entries(assets)) {
        if (typeof val === "number") {
          userBalance[ticker] = { available: val, locked: 0 };
        } else if (val && typeof val === "object") {
          userBalance[ticker] = {
            available: Number((val as any).available ?? 0),
            locked:    Number((val as any).locked    ?? 0),
          };
        }
      }
    }

    this.balances.set(wallet.userId, userBalance);
  }

  // -------------------------------------------------------------------------
  // Message router — called by the main loop for each dequeued message
  // -------------------------------------------------------------------------

  process({ message, clientId }: { message: EngineRequest; clientId: string }): void {
    switch (message.type) {

      // -----------------------------------------------------------------------
      case CREATE_ORDER: {
        try {
          const { symbol, price, quantity, side, userId, orderType, orderId } =
            message.data;

          const { executedQty, fills, remainingQty, restingOnBook } =
            this.createOrder(symbol, price, quantity, side, userId, orderId, orderType);

          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: ORDER_PLACED,
            payload: {
              orderId,
              executedQty,
              remainingQty,
              restingOnBook,
              fills: fills.map((f) => ({
                price:   f.price.toString(),
                qty:     f.qty,
                matchId: f.matchId,
              })),
            },
          });
        } catch (err) {
          const orderId = message.data.orderId;
          console.error("[Engine] CREATE_ORDER error:", err);
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: ORDER_CANCELLED,
            payload: {
              orderId,
              executedQty:  0,
              remainingQty: 0,
              error: err instanceof Error ? err.message : "Unknown error",
            },
          });
        }
        break;
      }

      // -----------------------------------------------------------------------
      case CANCEL_ORDER: {
        const { orderId, symbol } = message.data;
        try {
          const { baseAsset, quoteAsset } = parseSymbol(symbol);
          const orderbook = this.getOrCreateOrderbook(symbol);
          if (!orderbook) throw new Error(`No order book for symbol: ${symbol}`);

          // Find order on either side
          const order =
            orderbook.bids.find((o) => o.orderId === orderId) ??
            orderbook.asks.find((o) => o.orderId === orderId);

          if (!order) throw new Error(`Order not found: ${orderId}`);

          const userWallet = this.balances.get(order.userId);
          if (!userWallet) throw new Error("Wallet not found");

          if (order.side === "buy") {
            const price = orderbook.cancelBid(orderId);
            const remainingQty  = order.quantity - order.filled;
            const lockedRelease = remainingQty * order.price;
            const q = userWallet[quoteAsset];
            if (q) { q.available += lockedRelease; q.locked -= lockedRelease; }
            if (price !== undefined) this.sendUpdatedDepthAt(price.toString(), symbol);
          } else {
            const price = orderbook.cancelAsk(orderId);
            const remainingQty = order.quantity - order.filled;
            const b = userWallet[baseAsset];
            if (b) { b.available += remainingQty; b.locked -= remainingQty; }
            if (price !== undefined) this.sendUpdatedDepthAt(price.toString(), symbol);
          }

          // Emit ORDER_UPDATE so execution-service marks it CANCELLED in DB
          RedisManager.getInstance().pushOrderUpdate({
            type: ORDER_UPDATE,
            data: {
              orderId,
              executedQty:  order.filled,
              remainingQty: order.quantity - order.filled,
              status:       "CANCELLED",
            },
          });

          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: ORDER_CANCELLED,
            payload: { orderId, executedQty: 0, remainingQty: 0 },
          });
        } catch (err) {
          console.error("[Engine] CANCEL_ORDER error:", err);
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: ORDER_CANCELLED,
            payload: {
              orderId,
              executedQty:  0,
              remainingQty: 0,
              error: err instanceof Error ? err.message : "Unknown error",
            },
          });
        }
        break;
      }

      // -----------------------------------------------------------------------
      case GET_OPEN_ORDERS: {
        try {
          const orderbook = this.orderbookMap.get(message.data.symbol);
          if (!orderbook) throw new Error(`No order book for symbol: ${message.data.symbol}`);
          const openOrders = orderbook.getOpenOrders(message.data.userId);
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: OPEN_ORDERS,
            payload: openOrders.map(serializeOrder),
          });
        } catch (err) {
          console.error("[Engine] GET_OPEN_ORDERS error:", err);
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: OPEN_ORDERS,
            payload: [],
          });
        }
        break;
      }

      // -----------------------------------------------------------------------
      case GET_DEPTH: {
        try {
          const orderbook = this.orderbookMap.get(message.data.symbol);
          if (!orderbook) throw new Error(`No order book for symbol: ${message.data.symbol}`);
          const depth = orderbook.getDepth();
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: DEPTH,
            payload: {
              symbol: message.data.symbol,
              bids:   depth.bids,
              asks:   depth.asks,
            },
          });
        } catch (err) {
          console.error("[Engine] GET_DEPTH error:", err);
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: DEPTH,
            payload: { symbol: message.data.symbol, bids: [], asks: [] },
          });
        }
        break;
      }

      // -----------------------------------------------------------------------
      case ADD_USER: {
        try {
          const { userId, wallet } = message.data;
          this.loadWalletIntoMemory(wallet ?? { userId, balance: 50000, assetsHeld: "{}" });
          console.log(`[Engine] Loaded wallet for new user: ${userId}`);
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: NEW_USER,
            payload: { status: "success" },
          });
        } catch (err) {
          console.error("[Engine] ADD_USER error:", err);
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: NEW_USER,
            payload: { status: "error" },
          });
        }
        break;
      }

      // -----------------------------------------------------------------------
      case ON_RAMP: {
        try {
          const { userId, amount } = message.data;
          const n = Number(amount);
          if (!Number.isFinite(n) || n <= 0) throw new Error("Invalid deposit amount");
          let w = this.balances.get(userId);
          if (!w) { w = {}; this.balances.set(userId, w); }
          if (!w[BASE_CURRENCY]) w[BASE_CURRENCY] = { available: 0, locked: 0 };
          w[BASE_CURRENCY]!.available += n;
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: ON_RAMP,
            payload: { status: "success", message: `Deposited ${n} ${BASE_CURRENCY}`, txnId: message.data.txnId },
          });
        } catch (err) {
          RedisManager.getInstance().sendToApiGateway(clientId, {
            type: ON_RAMP,
            payload: { status: "error", message: "Deposit failed", txnId: message.data?.txnId },
          });
        }
        break;
      }
    }
  }

  // -------------------------------------------------------------------------
  // createOrder — core order placement logic
  // -------------------------------------------------------------------------

  createOrder(
    symbol:    string,
    price:     string,
    quantity:  string,
    side:      "buy" | "sell",
    userId:    string,
    orderId:   string,
    orderType: "limit" | "market" = "limit",
  ) {
    const orderbook = this.getOrCreateOrderbook(symbol);
    if (!orderbook) throw new Error(`No order book for symbol: ${symbol}`);

    const { baseAsset, quoteAsset } = parseSymbol(symbol);

    // For market orders use a price that always crosses the book
    const effectivePrice =
      orderType === "market"
        ? side === "buy" ? Number.MAX_SAFE_INTEGER : 0
        : Number(price);

    const qty = Number(quantity);

    if (!Number.isFinite(effectivePrice) || effectivePrice < 0)
      throw new Error(`Invalid price: ${price}`);
    if (!Number.isFinite(qty) || qty <= 0)
      throw new Error(`Invalid quantity: ${quantity}`);

    // Lock funds before touching the order book
    this.lockFunds(baseAsset, quoteAsset, side, userId, effectivePrice, qty);

    const order: Omit<Order, "seq"> = {
      price:    effectivePrice,
      quantity: qty,
      orderId,
      filled:   0,
      side,
      userId,
    };

    // Limit orders rest on the book; market orders are IOC (fill or discard)
    const shouldRest = orderType === "limit";
    const { fills, executedQty } = orderbook.addOrder(order, { rest: shouldRest });

    // Update in-memory wallets for taker and all makers
    this.settleBalances(userId, baseAsset, quoteAsset, side, fills);

    const remainingQty  = qty - executedQty;
    const restingOnBook = shouldRest && remainingQty > 0;

    // Release over-locked funds (favorable fill price, or unfilled market qty)
    this.releaseSurplusLock(
      userId, baseAsset, quoteAsset, side,
      effectivePrice, executedQty, remainingQty, restingOnBook, fills,
    );

    // Push DB messages to execution-service
    this.emitMatchCreatedEvents(fills, symbol, side, userId, orderId);
    this.emitOrderUpdateEvents(
      orderId, executedQty, remainingQty, restingOnBook,
      symbol, price, quantity, side, userId, fills,
    );

    // Broadcast realtime updates to Realtime Service
    this.publishDepthUpdates(fills, price, side, symbol);
    this.publishTradeEvents(fills, symbol, side);

    // Update current price on the order book
    if (fills.length > 0) {
      orderbook.currentPrice = fills[fills.length - 1]!.price;
    }

    return { executedQty, fills, remainingQty, restingOnBook };
  }

  // -------------------------------------------------------------------------
  // Fund locking
  // -------------------------------------------------------------------------

  private lockFunds(
    baseAsset:  string,
    quoteAsset: string,
    side:       "buy" | "sell",
    userId:     string,
    price:      number,
    qty:        number,
  ) {
    const wallet = this.balances.get(userId);
    if (!wallet) throw new Error("User wallet not initialised in engine");

    if (side === "buy") {
      const cost  = qty * price;
      const asset = wallet[quoteAsset];
      if (!asset) throw new Error(`User has no ${quoteAsset} balance`);
      if (asset.available < cost) throw new Error("Insufficient funds");
      asset.available -= cost;
      asset.locked    += cost;
    } else {
      const asset = wallet[baseAsset];
      if (!asset) throw new Error(`User has no ${baseAsset} to sell`);
      if (asset.available < qty) throw new Error(`Insufficient ${baseAsset} holdings`);
      asset.available -= qty;
      asset.locked    += qty;
    }
  }

  // -------------------------------------------------------------------------
  // In-memory settlement after fills
  // -------------------------------------------------------------------------

  private settleBalances(
    userId:     string,
    baseAsset:  string,
    quoteAsset: string,
    side:       "buy" | "sell",
    fills:      Fill[],
  ) {
    const userWallet = this.balances.get(userId);
    if (!userWallet) throw new Error(`Wallet ${userId} not found`);

    if (!userWallet[baseAsset])  userWallet[baseAsset]  = { available: 0, locked: 0 };
    if (!userWallet[quoteAsset]) userWallet[quoteAsset] = { available: 0, locked: 0 };

    for (const fill of fills) {
      const makerWallet = this.balances.get(fill.otherUserId);
      if (!makerWallet) throw new Error(`Maker wallet ${fill.otherUserId} not found`);
      if (!makerWallet[baseAsset])  makerWallet[baseAsset]  = { available: 0, locked: 0 };
      if (!makerWallet[quoteAsset]) makerWallet[quoteAsset] = { available: 0, locked: 0 };

      const fillCost = fill.qty * fill.price;

      if (side === "buy") {
        // Taker (buyer) spent quote, received base
        userWallet[quoteAsset]!.locked    -= fillCost;
        userWallet[baseAsset]!.available  += fill.qty;
        // Maker (seller) had base locked, receives quote
        makerWallet[baseAsset]!.locked    -= fill.qty;
        makerWallet[quoteAsset]!.available += fillCost;
      } else {
        // Taker (seller) had base locked, receives quote
        userWallet[baseAsset]!.locked     -= fill.qty;
        userWallet[quoteAsset]!.available += fillCost;
        // Maker (buyer) spent quote locked, receives base
        makerWallet[quoteAsset]!.locked   -= fillCost;
        makerWallet[baseAsset]!.available += fill.qty;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Release over-locked funds
  // (e.g. limit buy filled at a lower price than the limit)
  // -------------------------------------------------------------------------

  private releaseSurplusLock(
    userId:        string,
    baseAsset:     string,
    quoteAsset:    string,
    side:          "buy" | "sell",
    price:         number,
    executedQty:   number,
    remainingQty:  number,
    restingOnBook: boolean,
    fills:         Fill[],
  ) {
    const wallet = this.balances.get(userId);
    if (!wallet) return;

    if (side === "buy") {
      // Return difference between limit price paid and actual fill prices
      const reservedForFilled = executedQty * price;
      const actuallySpent     = fills.reduce((s, f) => s + f.qty * f.price, 0);
      const priceSurplus      = reservedForFilled - actuallySpent;
      // If not resting, also return the reserved amount for unfilled qty
      const unusedReserve     = restingOnBook ? 0 : remainingQty * price;
      const toRelease         = priceSurplus + unusedReserve;
      if (toRelease > 0) {
        const a = wallet[quoteAsset];
        if (a) { a.locked -= toRelease; a.available += toRelease; }
      }
    } else {
      // Market sell: release any unmatched qty that couldn't fill
      if (!restingOnBook && remainingQty > 0) {
        const a = wallet[baseAsset];
        if (a) { a.locked -= remainingQty; a.available += remainingQty; }
      }
    }
  }

  // -------------------------------------------------------------------------
  // Emit MATCH_CREATED events → "matches" queue → Execution Service
  // -------------------------------------------------------------------------

  private emitMatchCreatedEvents(
    fills:    Fill[],
    symbol:   string,
    side:     "buy" | "sell",
    userId:   string,
    orderId:  string,
  ) {
    for (const fill of fills) {
      const buyerId     = side === "buy"  ? userId          : fill.otherUserId;
      const sellerId    = side === "sell" ? userId          : fill.otherUserId;
      const buyOrderId  = side === "buy"  ? orderId         : fill.makerOrderId;
      const sellOrderId = side === "sell" ? orderId         : fill.makerOrderId;

      RedisManager.getInstance().pushMatchCreated({
        type: MATCH_CREATED,
        data: {
          matchId:       fill.matchId,
          symbol,
          price:         fill.price,
          quantity:      fill.qty,
          quoteQuantity: fill.qty * fill.price,
          isBuyerMaker:  side === "sell",
          timestamp:     new Date().toISOString(),
          buyerId,
          sellerId,
          buyOrderId,
          sellOrderId,
        },
      });
    }
  }

  // -------------------------------------------------------------------------
  // Emit ORDER_UPDATE events → "order_updates" queue → Execution Service
  // -------------------------------------------------------------------------

  private emitOrderUpdateEvents(
    orderId:       string,
    executedQty:   number,
    remainingQty:  number,
    restingOnBook: boolean,
    symbol:        string,
    price:         string,
    quantity:      string,
    side:          "buy" | "sell",
    userId:        string,
    fills:         Fill[],
  ) {
    const takerStatus =
      remainingQty === 0 ? "FILLED" :
      executedQty > 0    ? "PARTIALLY_FILLED" : "OPEN";

    // Taker order update
    RedisManager.getInstance().pushOrderUpdate({
      type: ORDER_UPDATE,
      data: {
        orderId,
        executedQty,
        remainingQty,
        status: takerStatus as any,
        symbol,
        price,
        quantity,
        side,
        userId,
      },
    });

    // Maker order updates
    for (const fill of fills) {
      RedisManager.getInstance().pushOrderUpdate({
        type: ORDER_UPDATE,
        data: {
          orderId:      fill.makerOrderId,
          executedQty:  fill.qty,
          remainingQty: 0,
          status:       "FILLED",
        },
      });
    }
  }

  // -------------------------------------------------------------------------
  // Publish WebSocket events → Realtime Service via Redis pub/sub
  // -------------------------------------------------------------------------

  private publishTradeEvents(
    fills:  Fill[],
    symbol: string,
    side:   "buy" | "sell",
  ) {
    const ts = Date.now();
    for (const fill of fills) {
      RedisManager.getInstance().publishWsMessage(`trade@${symbol}`, {
        stream: `trade@${symbol}`,
        data: {
          e: "trade",
          t: fill.matchId,
          T: ts,
          m: side === "sell",  // isBuyerMaker
          p: fill.price.toString(),
          q: fill.qty.toString(),
          s: symbol,
        },
      });
    }
  }

  private publishDepthUpdates(
    fills:  Fill[],
    price:  string,
    side:   "buy" | "sell",
    symbol: string,
  ) {
    const orderbook = this.getOrCreateOrderbook(symbol);
    if (!orderbook) return;

    const depth        = orderbook.getDepth();
    const changedPrices = new Set(fills.map((f) => f.price));
    const priceNum      = Number(price);

    if (side === "buy") {
      const updatedAsks = depth.asks.filter((x) => changedPrices.has(Number(x[0])));
      const updatedBid  = depth.bids.find((x)  => Number(x[0]) === priceNum);
      RedisManager.getInstance().publishWsMessage(`depth@${symbol}`, {
        stream: `depth@${symbol}`,
        data: {
          e: "depth",
          a: updatedAsks,
          b: updatedBid ? [updatedBid] : [],
        },
      });
    } else {
      const updatedBids = depth.bids.filter((x) => changedPrices.has(Number(x[0])));
      const updatedAsk  = depth.asks.find((x)  => Number(x[0]) === priceNum);
      RedisManager.getInstance().publishWsMessage(`depth@${symbol}`, {
        stream: `depth@${symbol}`,
        data: {
          e: "depth",
          b: updatedBids,
          a: updatedAsk ? [updatedAsk] : [],
        },
      });
    }
  }

  private sendUpdatedDepthAt(price: string, symbol: string) {
    const orderbook = this.getOrCreateOrderbook(symbol);
    if (!orderbook) return;

    const depth    = orderbook.getDepth();
    const priceNum = Number(price);
    const bid      = depth.bids.find((x) => Number(x[0]) === priceNum);
    const ask      = depth.asks.find((x) => Number(x[0]) === priceNum);

    RedisManager.getInstance().publishWsMessage(`depth@${symbol}`, {
      stream: `depth@${symbol}`,
      data: {
        e: "depth",
        b: bid ? [bid] : [[price, "0"]],
        a: ask ? [ask] : [[price, "0"]],
      },
    });
  }
}
