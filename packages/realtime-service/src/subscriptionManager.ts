import { createClient }    from "redis";
import type { RedisClientType } from "redis";
import { UserManager }    from "./userManager.js";
import { config }         from "dotenv";

config({ quiet: true });

const REDIS_URL = process.env.REDIS_URL ?? "redis://redis:6379";

// ---------------------------------------------------------------------------
// SubscriptionManager
//
// Bridges Redis pub/sub channels to connected WebSocket clients.
//
// Design:
//   - subscriptions:        userId → channels[]
//   - reverseSubscriptions: channel → userId[]
//
// Redis subscribe is lazy: only subscribes to a channel when the first
// browser client requests it, and unsubscribes when the last one leaves.
// This keeps Redis subscription count proportional to active interest.
// ---------------------------------------------------------------------------

export class SubscriptionManager {
  private static instance: SubscriptionManager;
  private subscriptions:        Map<string, string[]> = new Map();
  private reverseSubscriptions: Map<string, string[]> = new Map();
  private redisClient: RedisClientType;

  private constructor() {
    this.redisClient = createClient({ url: REDIS_URL });
    this.redisClient.on("error", (err) => console.error("[Realtime] Redis error:", err));
  }

  public static getInstance(): SubscriptionManager {
    if (!this.instance) this.instance = new SubscriptionManager();
    return this.instance;
  }

  public async connect(): Promise<void> {
    if (!this.redisClient.isOpen) await this.redisClient.connect();
  }

  public subscribe(userId: string, channel: string): void {
    if (this.subscriptions.get(userId)?.includes(channel)) return;

    this.subscriptions.set(userId, (this.subscriptions.get(userId) ?? []).concat(channel));
    this.reverseSubscriptions.set(channel, (this.reverseSubscriptions.get(channel) ?? []).concat(userId));

    // Only subscribe to Redis when first client interested
    if (this.reverseSubscriptions.get(channel)!.length === 1) {
      this.redisClient.subscribe(channel, this.onRedisMessage);
    }
  }

  public unsubscribe(userId: string, channel: string): void {
    const subs = this.subscriptions.get(userId);
    if (subs) this.subscriptions.set(userId, subs.filter((s) => s !== channel));

    const rev = this.reverseSubscriptions.get(channel);
    if (rev) {
      const updated = rev.filter((id) => id !== userId);
      this.reverseSubscriptions.set(channel, updated);

      // Unsubscribe from Redis when last client leaves
      if (updated.length === 0) {
        this.reverseSubscriptions.delete(channel);
        this.redisClient.unsubscribe(channel);
      }
    }
  }

  public userLeft(userId: string): void {
    const channels = this.subscriptions.get(userId) ?? [];
    channels.forEach((ch) => this.unsubscribe(userId, ch));
    this.subscriptions.delete(userId);
  }

  private onRedisMessage = (message: string, channel: string): void => {
    const parsed = JSON.parse(message);
    this.reverseSubscriptions.get(channel)?.forEach((userId) => {
      UserManager.getInstance().getUser(userId)?.emit(parsed);
    });
  };
}
