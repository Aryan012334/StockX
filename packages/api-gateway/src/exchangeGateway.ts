// ---------------------------------------------------------------------------
// Exchange Gateway
//
// CortexCookie concept: a named boundary between the Trading App and the
// Stock Exchange. This class is the single point through which the Trading
// App communicates with the Matcher Service.
//
// Responsibilities:
//   1. Route CREATE_ORDER messages to symbol-specific BUY or SELL queues
//      so the Matcher can maintain per-symbol order books with no cross-symbol
//      interference.
//   2. Route all other messages (CANCEL_ORDER, GET_DEPTH, GET_OPEN_ORDERS,
//      ADD_USER, ON_RAMP) to the exchange:control queue.
//   3. Receive responses from the Matcher via per-request Redis pub/sub
//      channels (request-reply pattern, UUID correlation ID).
//
// Redis queue layout:
//   orders:<SYMBOL>:buy   — BUY  order messages  → Matcher
//   orders:<SYMBOL>:sell  — SELL order messages  → Matcher
//   exchange:control      — control messages     → Matcher
//   <correlationId>       — pub/sub channel for the Matcher response
// ---------------------------------------------------------------------------

import { createClient }  from "redis";
import type { RedisClientType } from "redis";
import { randomUUID }    from "crypto";
import { config }        from "dotenv";
import type { EngineRequest, EngineResponse } from "@stockx/shared";
import {
  CREATE_ORDER,
  buyQueueName,
  sellQueueName,
  EXCHANGE_CONTROL_QUEUE,
} from "@stockx/shared";

config({ quiet: true });

const REDIS_URL = process.env.REDIS_URL ?? "redis://redis:6379";
const TIMEOUT_MS = 7_000;

export class ExchangeGateway {
  private subscriber: RedisClientType;   // dedicated subscribe connection
  private publisher:  RedisClientType;   // dedicated publish / lpush connection
  private static instance: ExchangeGateway;
  private connected = false;

  private constructor() {
    this.subscriber = createClient({ url: REDIS_URL });
    this.publisher  = createClient({ url: REDIS_URL });
    this.subscriber.on("error", (e) => console.error("[ExchangeGateway] subscriber error:", e));
    this.publisher.on("error",  (e) => console.error("[ExchangeGateway] publisher error:", e));
  }

  public static getInstance(): ExchangeGateway {
    if (!this.instance) this.instance = new ExchangeGateway();
    return this.instance;
  }

  public async connect(): Promise<void> {
    if (this.connected) return;
    await this.subscriber.connect();
    await this.publisher.connect();
    this.connected = true;
    console.log("[ExchangeGateway] Connected to Redis");
  }

  // -------------------------------------------------------------------------
  // send — route a request to the appropriate queue and await the response.
  //
  // CREATE_ORDER is pushed to the symbol-specific BUY or SELL queue so the
  // Matcher can process all orders for the same symbol deterministically.
  //
  // All other messages (CANCEL, GET_DEPTH, ADD_USER, etc.) go to the shared
  // exchange:control queue.
  // -------------------------------------------------------------------------
  public send(message: EngineRequest): Promise<EngineResponse> {
    return new Promise<EngineResponse>((resolve, reject) => {
      const correlationId = randomUUID();

      const timeout = setTimeout(() => {
        this.subscriber.unsubscribe(correlationId).catch(() => {});
        reject(new Error(`ExchangeGateway: Matcher timeout after ${TIMEOUT_MS / 1000}s`));
      }, TIMEOUT_MS);

      // Subscribe to the per-request response channel before pushing the
      // message, to avoid a race where the Matcher responds before we listen.
      this.subscriber.subscribe(correlationId, (raw) => {
        clearTimeout(timeout);
        this.subscriber.unsubscribe(correlationId).catch(() => {});
        resolve(JSON.parse(raw) as EngineResponse);
      }).then(() => {
        // Determine which queue this message belongs to
        const queue = this.resolveQueue(message);
        this.publisher.lPush(queue, JSON.stringify({ clientId: correlationId, message }));
      }).catch((err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }

  // -------------------------------------------------------------------------
  // resolveQueue — CortexCookie symbol-routing logic.
  //
  // BUY  orders for RIL_INR  → "orders:RIL_INR:buy"
  // SELL orders for RIL_INR  → "orders:RIL_INR:sell"
  // Everything else           → "exchange:control"
  // -------------------------------------------------------------------------
  private resolveQueue(message: EngineRequest): string {
    if (message.type === CREATE_ORDER) {
      const { symbol, side } = message.data;
      return side === "buy" ? buyQueueName(symbol) : sellQueueName(symbol);
    }
    return EXCHANGE_CONTROL_QUEUE;
  }
}
