// ---------------------------------------------------------------------------
// API Gateway ↔ Matcher Service bridge
// Uses Redis request-reply: each request gets a unique UUID channel.
// The Matcher Service publishes its response to that channel.
// ---------------------------------------------------------------------------

import { config } from "dotenv";
import { createClient } from "redis";
import type { RedisClientType } from "redis";
import type { EngineResponse, EngineRequest } from "@stockx/shared";
import { randomUUID } from "crypto";

config({ quiet: true });

const REDIS_URL = process.env.REDIS_URL ?? "redis://redis:6379";

export class EngineClient {
  private client:    RedisClientType;  // subscriber (one connection per instance)
  private publisher: RedisClientType;  // publisher
  private static instance: EngineClient;
  private connected = false;

  private constructor() {
    this.client    = createClient({ url: REDIS_URL });
    this.publisher = createClient({ url: REDIS_URL });
    this.client.on("error",    console.error);
    this.publisher.on("error", console.error);
  }

  public static getInstance(): EngineClient {
    if (!this.instance) this.instance = new EngineClient();
    return this.instance;
  }

  public async connect(): Promise<void> {
    if (this.connected) return;
    await this.client.connect();
    await this.publisher.connect();
    this.connected = true;
    console.log("[API Gateway] Connected to Redis");
  }

  /**
   * Send a request to the Matcher Service and await its response.
   * Throws after 7 seconds if no response arrives.
   */
  public sendRequest(message: EngineRequest): Promise<EngineResponse> {
    return new Promise<EngineResponse>((resolve, reject) => {
      const correlationId = randomUUID();

      const timeout = setTimeout(() => {
        this.client.unsubscribe(correlationId);
        reject(new Error("Matcher Service timeout — no response within 7 s"));
      }, 7_000);

      this.client.subscribe(correlationId, (raw) => {
        clearTimeout(timeout);
        this.client.unsubscribe(correlationId);
        resolve(JSON.parse(raw) as EngineResponse);
      });

      this.publisher.lPush(
        "messages",
        JSON.stringify({ clientId: correlationId, message }),
      );
    });
  }
}
