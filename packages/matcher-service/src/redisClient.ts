import { createClient } from "redis";
import type { RedisClientType } from "redis";
import type { EngineResponse } from "@stockx/shared";
import type { WsMessage } from "@stockx/shared";
import type { DbMessage } from "@stockx/shared";
import { MATCHES_QUEUE, ORDER_UPDATES_QUEUE } from "@stockx/shared";
import { config } from "dotenv";

config({ quiet: true });

// ---------------------------------------------------------------------------
// RedisManager  (Matcher Service)
//
// Queue / channel layout after surgical refactor:
//
//   INBOUND (Matcher consumes):
//     orders:<SYMBOL>:buy    — BUY  orders for a symbol
//     orders:<SYMBOL>:sell   — SELL orders for a symbol
//     exchange:control       — CANCEL, GET_DEPTH, ADD_USER, etc.
//
//   OUTBOUND (Matcher produces):
//     <correlationId>        — PUBLISH: per-request response to API Gateway
//     matches                — LPUSH: MATCH_CREATED events → Execution Service
//     order_updates          — LPUSH: ORDER_UPDATE events  → Execution Service
//     trade@<SYMBOL>         — PUBLISH: trade feed          → Realtime Service
//     depth@<SYMBOL>         — PUBLISH: depth updates       → Realtime Service
// ---------------------------------------------------------------------------

export class RedisManager {
  private client: RedisClientType;
  private static instance: RedisManager;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL ?? "redis://redis:6379",
    });
    this.client.on("error", (err) => console.error("[Matcher Redis] error:", err));
    this.client.connect().catch(console.error);
  }

  public static getInstance(): RedisManager {
    if (!this.instance) this.instance = new RedisManager();
    return this.instance;
  }

  /** Send a response back to the API Gateway (request-reply pattern) */
  public sendToApiGateway(clientId: string, message: EngineResponse): void {
    this.client.publish(clientId, JSON.stringify(message));
  }

  /**
   * Push a MATCH_CREATED event to the dedicated matches queue.
   * The Execution Service consumes only from this queue for settlement.
   */
  public pushMatchCreated(message: Extract<DbMessage, { type: "MATCH_CREATED" }>): void {
    this.client.lPush(MATCHES_QUEUE, JSON.stringify(message));
  }

  /**
   * Push an ORDER_UPDATE event to the dedicated order_updates queue.
   * The Execution Service consumes these to update Order status in Postgres.
   */
  public pushOrderUpdate(message: Extract<DbMessage, { type: "ORDER_UPDATE" }>): void {
    this.client.lPush(ORDER_UPDATES_QUEUE, JSON.stringify(message));
  }

  /** Publish a realtime event to the Realtime Service */
  public publishWsMessage(channel: string, message: WsMessage): void {
    this.client.publish(channel, JSON.stringify(message));
  }

  /** Block-pop the next message from a list of queues (priority order) */
  public async blockingPop(keys: string | string[], timeout = 0) {
    return this.client.brPop(keys as string[], timeout);
  }
}
