// ---------------------------------------------------------------------------
// Order Expiry Service
//
// US markets close at 4:00 PM Eastern Time.
// All OPEN and PARTIALLY_FILLED orders expire at market close.
//
// What happens at expiry:
//   1. Orders marked EXPIRED in the Order DB
//   2. Locked funds released (lockedBalance on Wallet)
//   3. Locked shares released (lockedQuantity on Holding)
//   4. Transaction record written (ORDER_BUY_REFUND / ORDER_SELL_REFUND)
//   5. Matcher notified to clear order books (via CANCEL_ORDER per order)
//
// Schedule: runs every minute, fires expiry logic once at 4PM ET
// ---------------------------------------------------------------------------

import { prisma }          from "@stockx/execution-service";
import { ExchangeGateway } from "./exchangeGateway.js";
import { CANCEL_ORDER }    from "@stockx/shared";
import { randomUUID }      from "crypto";

const MARKET_CLOSE_HOUR_ET = 16; // 4 PM Eastern

function isMarketCloseET(): boolean {
  const now = new Date();
  // Convert UTC to Eastern Time (ET = UTC-5 standard, UTC-4 daylight)
  const etOffset   = isDST(now) ? -4 : -5;
  const etHour     = (now.getUTCHours() + etOffset + 24) % 24;
  const etMinute   = now.getUTCMinutes();
  return etHour === MARKET_CLOSE_HOUR_ET && etMinute === 0;
}

function isDST(date: Date): boolean {
  // Approximate DST: second Sunday of March to first Sunday of November
  const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  return date.getTimezoneOffset() < Math.max(jan, jul);
}

let lastExpiredDate: string | null = null;

export async function runExpiryCheck(): Promise<void> {
  if (!isMarketCloseET()) return;

  // Only run once per day (prevent multiple triggers in the same minute)
  const today = new Date().toISOString().split("T")[0]!;
  if (lastExpiredDate === today) return;
  lastExpiredDate = today;

  console.log("[OrderExpiry] Market close — expiring open orders...");

  try {
    const openOrders = await prisma.order.findMany({
      where:   { status: { in: ["OPEN", "PARTIALLY_FILLED"] } },
      include: { stock: true },
    });

    if (openOrders.length === 0) {
      console.log("[OrderExpiry] No open orders to expire");
      return;
    }

    let expired = 0;

    for (const order of openOrders) {
      try {
        const remaining = Number(order.quantity) - Number(order.filledQty);
        if (remaining <= 0) continue;

        const symbol = `${order.stock.symbol}_${order.stock.quoteAsset}`;

        // 1. Notify matcher to remove from order book
        ExchangeGateway.getInstance().send({
          type: CANCEL_ORDER,
          data: { orderId: order.id, symbol },
        }).catch(() => {}); // best-effort, don't block

        // 2. Update DB atomically: mark EXPIRED + release locks + write refund tx
        await prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: order.id },
            data:  { status: "EXPIRED" },
          });

          if (order.side === "BUY") {
            const refundAmount = remaining * Number(order.price);
            const wallet       = await tx.wallet.findUnique({ where: { userId: order.userId } });
            if (wallet) {
              const newLocked = Math.max(0, Number(wallet.lockedBalance) - refundAmount);
              await tx.wallet.update({
                where: { userId: order.userId },
                data:  { lockedBalance: newLocked },
              });
              await tx.transaction.create({
                data: {
                  id:          randomUUID(),
                  walletId:    order.userId,
                  type:        "CREDIT",
                  category:    "ORDER_BUY_REFUND",
                  description: `Order expired — released locked funds for ${remaining} ${order.stock.symbol}`,
                  amount:      refundAmount,
                  balanceAfter: Number(wallet.balance),
                },
              });
            }
          } else {
            // SELL — release locked shares
            const holding = await tx.holding.findUnique({
              where: { userId_symbol: { userId: order.userId, symbol: order.stock.symbol } },
            });
            if (holding) {
              const newLocked = Math.max(0, Number(holding.lockedQuantity) - remaining);
              await tx.holding.update({
                where: { userId_symbol: { userId: order.userId, symbol: order.stock.symbol } },
                data:  { lockedQuantity: newLocked },
              });
            }
          }
        });

        expired++;
      } catch (err) {
        console.error(`[OrderExpiry] Failed to expire order ${order.id}:`, err);
      }
    }

    console.log(`[OrderExpiry] Expired ${expired}/${openOrders.length} orders at market close`);
  } catch (err) {
    console.error("[OrderExpiry] Expiry check failed:", err);
  }
}

// Start the expiry scheduler — checks every minute
export function startOrderExpiryScheduler(): void {
  setInterval(() => runExpiryCheck().catch(console.error), 60_000);
  console.log("[OrderExpiry] Scheduler started — checks every minute for 4PM ET close");
}
