// Messages sent from the Matcher Service to the Execution Service
// via the Redis "db_processor" queue.

export type DbMessage =
  | {
      // A match was created between a buy and sell order.
      // The Execution Service settles this atomically in PostgreSQL.
      type: "MATCH_CREATED";
      data: {
        matchId: string;         // Unique match ID — idempotency key
        symbol: string;          // e.g. "RIL_INR"
        price: number;
        quantity: number;
        quoteQuantity: number;   // price * quantity
        isBuyerMaker: boolean;
        timestamp: string;       // ISO-8601
        buyerId: string;
        sellerId: string;
        buyOrderId: string;
        sellOrderId: string;
      };
    }
  | {
      // An order's fill state changed.
      // The Execution Service updates the Order row in PostgreSQL.
      type: "ORDER_UPDATE";
      data: {
        orderId: string;
        executedQty: number;
        remainingQty: number;
        status: "OPEN" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED";
        symbol?: string;
        price?: string;
        quantity?: string;
        side?: "buy" | "sell";
        userId?: string;
      };
    };
