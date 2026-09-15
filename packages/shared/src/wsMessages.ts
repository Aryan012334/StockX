// WebSocket message types flowing:
//   Matcher Service → Redis pub/sub → Realtime Service → Browser

export type DepthUpdateMessage = {
  stream: string;
  data: {
    b?: [string, string][];   // incremental bid levels — "0" qty means remove
    a?: [string, string][];   // incremental ask levels — "0" qty means remove
    e: "depth";
  };
};

export type TradeMessage = {
  stream: string;
  data: {
    e: "trade";
    t: string;       // matchId
    T: number;       // timestamp (epoch ms)
    m: boolean;      // isBuyerMaker
    p: string;       // price
    q: string;       // quantity
    s: string;       // symbol (e.g. "RIL_INR")
  };
};

export type WsMessage = DepthUpdateMessage | TradeMessage;

export const SUBSCRIBE   = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export type SubscribeMessage = {
  method: typeof SUBSCRIBE;
  params: string[];
};

export type UnsubscribeMessage = {
  method: typeof UNSUBSCRIBE;
  params: string[];
};

export type IncomingMessage  = SubscribeMessage | UnsubscribeMessage;
export type OutgoingMessage  = DepthUpdateMessage | TradeMessage;
