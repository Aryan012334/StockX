import { randomUUID }          from "crypto";
import { WebSocket }           from "ws";
import { User }                from "./user.js";
import { SubscriptionManager } from "./subscriptionManager.js";

export class UserManager {
  private static instance: UserManager;
  private users: Map<string, User> = new Map();

  private constructor() {}

  public static getInstance(): UserManager {
    if (!this.instance) this.instance = new UserManager();
    return this.instance;
  }

  public addUser(ws: WebSocket): User {
    const id   = randomUUID();
    const user = new User(id, ws);
    this.users.set(id, user);
    ws.on("close", () => {
      this.users.delete(id);
      SubscriptionManager.getInstance().userLeft(id);
    });
    return user;
  }

  public getUser(id: string): User | undefined {
    return this.users.get(id);
  }
}
