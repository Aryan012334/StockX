import { WebSocket }             from "ws";
import { SubscriptionManager }  from "./subscriptionManager.js";
import type { IncomingMessage, OutgoingMessage } from "@stockx/shared";
import { SUBSCRIBE, UNSUBSCRIBE }               from "@stockx/shared";

export class User {
  private id:            string;
  private ws:            WebSocket;
  private subscriptions: string[] = [];

  constructor(id: string, ws: WebSocket) {
    this.id = id;
    this.ws = ws;
    this.addListeners();
  }

  public subscribe(subscription: string): void {
    this.subscriptions.push(subscription);
  }

  public unsubscribe(subscription: string): void {
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
  }

  public emit(message: OutgoingMessage): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private addListeners(): void {
    this.ws.on("message", (raw: Buffer | string) => {
      try {
        const msg: IncomingMessage = JSON.parse(raw.toString());
        const method = msg.method?.toUpperCase();

        if (method === SUBSCRIBE) {
          msg.params.forEach((s) =>
            SubscriptionManager.getInstance().subscribe(this.id, s),
          );
        }
        if (method === UNSUBSCRIBE) {
          msg.params.forEach((s) =>
            SubscriptionManager.getInstance().unsubscribe(this.id, s),
          );
        }
      } catch {
        // Ignore malformed messages
      }
    });
  }
}
