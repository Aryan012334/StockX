"use client";

// ---------------------------------------------------------------------------
// MarketDataManager — singleton WebSocket client
//
// Bridges the browser WebSocket connection to the Realtime Service (port 3002).
//
// Components subscribe by calling registerCallback(eventType, id, fn) and
// send messages (SUBSCRIBE / UNSUBSCRIBE) via sendMessage().
//
// Supported stream event types emitted by the Matcher Service:
//   "trade"  — new trade match (price, qty, symbol, matchId, timestamp)
//   "depth"  — incremental order book update (bids / asks delta)
// ---------------------------------------------------------------------------

const WS_URL =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:3002")
    : "ws://localhost:3002";

type EventType = "trade" | "depth" | string;
type SubscriberId = string;
type CallbackFn = (data: any) => void;

export class MarketDataManager {
  private ws: WebSocket | null = null;
  private static instance: MarketDataManager;
  private buffered: object[] = [];
  private msgId = 1;
  private callbacks: Map<EventType, Map<SubscriberId, CallbackFn>> = new Map();

  private constructor() {
    this.connect();
  }

  public static getInstance(): MarketDataManager {
    if (!this.instance) this.instance = new MarketDataManager();
    return this.instance;
  }

  private connect() {
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      // Flush any messages that arrived before the connection was open
      while (this.buffered.length > 0) {
        const msg = this.buffered.shift();
        if (msg) this.ws?.send(JSON.stringify(msg));
      }
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data as string);
        const type = msg?.data?.e as EventType | undefined;
        if (!type) return;

        const cbs = this.callbacks.get(type);
        if (!cbs || cbs.size === 0) return;

        let payload: any = null;

        if (type === "trade") {
          // Map the wire format (t, p, q, s, T, m) to a friendlier shape
          payload = {
            id:           msg.data.t,            // matchId
            matchId:      msg.data.t,
            lastPrice:    msg.data.p,
            price:        msg.data.p,
            quantity:     msg.data.q,
            symbol:       msg.data.s,
            isBuyerMaker: msg.data.m,
            timestamp:    msg.data.T,
          };
        } else if (type === "depth") {
          const symbol =
            typeof msg?.stream === "string"
              ? msg.stream.split("@")[1]
              : undefined;
          payload = {
            symbol,
            bids: msg.data.b ?? [],
            asks: msg.data.a ?? [],
          };
        }

        if (payload) cbs.forEach((cb) => cb(payload));
      } catch (err) {
        console.error("[MarketDataManager] Failed to parse WS message:", err);
      }
    };

    this.ws.onclose = () => {
      console.warn("[MarketDataManager] WebSocket closed — reconnecting in 3 s");
      setTimeout(() => this.connect(), 3_000);
    };

    this.ws.onerror = (err) => {
      console.error("[MarketDataManager] WebSocket error:", err);
    };
  }

  public sendMessage(message: object) {
    const msg = { ...message, id: this.msgId++ };
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
      this.buffered.push(msg);
    }
  }

  public registerCallback(type: EventType, id: SubscriberId, cb: CallbackFn) {
    if (!this.callbacks.has(type)) this.callbacks.set(type, new Map());
    this.callbacks.get(type)!.set(id, cb);
  }

  public deRegisterCallback(type: EventType, id: SubscriberId) {
    const cbs = this.callbacks.get(type);
    if (!cbs) return;
    cbs.delete(id);
    if (cbs.size === 0) this.callbacks.delete(type);
  }
}
