// ---------------------------------------------------------------------------
// Realtime Service — WebSocket server
//
// CortexCookie role:
//   - Bridge between Redis pub/sub and browser WebSocket clients
//   - Clients subscribe to streams: "trade@SYMBOL" and "depth@SYMBOL"
//   - The Matcher Service publishes to these Redis channels
//   - This service fans out to all subscribed browser connections
//
// Port: 3002
// ---------------------------------------------------------------------------

import { WebSocketServer } from "ws";
import { config }          from "dotenv";
config({ quiet: true });

import { UserManager }         from "./userManager.js";
import { SubscriptionManager } from "./subscriptionManager.js";

const PORT = Number(process.env.WS_PORT ?? 3002);
const wss  = new WebSocketServer({ port: PORT });

await SubscriptionManager.getInstance().connect();

wss.on("connection", (ws) => {
  UserManager.getInstance().addUser(ws);
});

console.log(`[Realtime] WebSocket server listening on port ${PORT}`);
