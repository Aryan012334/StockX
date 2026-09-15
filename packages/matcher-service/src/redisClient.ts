import { createClient } from "redis";
import type { RedisClientType } from "redis";
import type { EngineResponse } from "@stockx/shared";
import type { WsMessage } from "@stockx/shared";
import type { DbMessage } from "@stockx/shared";
import { config } from "dotenv";

config({ quiet: true });

// ---------------------------------------------------------------------------
// RedisManager
// Singleton that owns the matcher-service's Redis connection.
//
// Channels / queues used:
//   "messages"      — BLPOP queue: API Gateway → Matcher Service requests
//   "<clientId>"    — PUBLISH: Matcher Service → API Gateway response
//   "db_processor"  — LPUSH queue: Matcher Service → Execution Service events
//   "trade@SYMBOL"  — PUBLISH: Matcher Service → Realtime Service
//   "depth@SYMBOL"  — PUBLISH: Matcher Service → Realtime Service
// ---------------------------------------------------------------------------

export class RedisManager {
  private client: RedisClientType;
  private static instance: RedisManager;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL ?? "redis://redis:6379",
    });
    this.client.on("error", (err) => console.error("[Redis] error:", err));
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

  /** Push a settlement/order-update event to the Execution Service queue */
  public pushToExecutionQueue(message: DbMessage): void {
    this.client.lPush("db_processor", JSON.stringify(message));
  }

  /** Publish a realtime event to the Realtime Service */
  public publishWsMessage(channel: string, message: WsMessage): void {
    this.client.publish(channel, JSON.stringify(message));
  }

  /** Block-pop the next request from the API Gateway */
  public async blockingPop(key: string, timeout = 0) {
    return this.client.brPop(key, timeout);
  }
}
