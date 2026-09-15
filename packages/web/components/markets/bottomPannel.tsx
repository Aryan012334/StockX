"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession }                        from "next-auth/react";
import { getWallet, type Wallet }            from "@/lib/utils/getWallet";
import { getOpenOrders, cancelOrder, getOrderHistory } from "@/lib/utils/apiClient";
import type { OrderRecord }                  from "@stockx/shared";
import { Button }                            from "@/components/ui/button";

type OpenOrder = {
  orderId:  string;
  side:     "buy" | "sell";
  price:    number | string;
  quantity: number | string;
};

const fmt = (v: number | string | undefined, dp = 2) => {
  const n = Number(v ?? 0);
  return Number.isFinite(n)
    ? n.toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp })
    : "—";
};

const STATUS_COLORS: Record<string, string> = {
  OPEN:             "text-[var(--brand-cyan)]",
  PARTIALLY_FILLED: "text-amber-400",
  FILLED:           "text-emerald-500",
  CANCELLED:        "text-muted-foreground",
  EXPIRED:          "text-muted-foreground",
};

const TABS = [
  { key: "balances", label: "Balances"      },
  { key: "open",     label: "Open Orders"   },
  { key: "history",  label: "Order History" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export function BottomPannel({ market }: { market: string }) {
  const { data: session, status } = useSession();
  const [activeTab,   setActiveTab]   = useState<TabKey>("balances");
  const [wallet,      setWallet]      = useState<Wallet | null>(null);
  const [openOrders,  setOpenOrders]  = useState<OpenOrder[]>([]);
  const [history,     setHistory]     = useState<OrderRecord[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const userId = (session?.user as any)?.id;
    if (!userId) return;
    try {
      const [walletData, ordersData, historyData] = await Promise.all([
        getWallet(),
        getOpenOrders(userId, market),
        getOrderHistory(userId, market, 20),
      ]);
      setWallet(walletData);
      setOpenOrders(ordersData ?? []);
      setHistory(historyData ?? []);
    } catch (err) {
      console.error("[BottomPannel] Refresh failed:", err);
    } finally {
      setLoading(false);
    }
  }, [session, market]);

  useEffect(() => {
    if (status !== "authenticated") return;
    setLoading(true);
    fetchData();
    const interval = setInterval(fetchData, 5_000);
    return () => clearInterval(interval);
  }, [status, fetchData]);

  const handleCancel = async (orderId: string) => {
    setCancellingId(orderId);
    try {
      await cancelOrder(orderId, market);
      await fetchData();
    } catch (err) {
      console.error("[BottomPannel] Cancel failed:", err);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <section className="flex h-full flex-col rounded-xl bg-transparent">
      {/* Tab row */}
      <div className="flex items-center gap-1 px-2 pt-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            {tab.label}
            {tab.key === "open" && openOrders.length > 0 && (
              <span className="ml-1 text-muted-foreground">({openOrders.length})</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-4 pb-4 pt-3">
        {status !== "authenticated" ? (
          <LoggedOutState />
        ) : activeTab === "balances" ? (
          <BalancesTab wallet={wallet} loading={loading} />
        ) : activeTab === "open" ? (
          <OpenOrdersTab
            orders={openOrders}
            loading={loading}
            cancellingId={cancellingId}
            onCancel={handleCancel}
          />
        ) : (
          <OrderHistoryTab orders={history} loading={loading} />
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function LoggedOutState() {
  return (
    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
      Please{" "}
      <a href="/login"  className="mx-1 text-[var(--brand-cyan)] hover:underline">log in</a>{" "}
      or{" "}
      <a href="/signup" className="mx-1 text-[var(--brand-cyan)] hover:underline">sign up</a>{" "}
      to see your balances and orders.
    </div>
  );
}

function BalancesTab({ wallet, loading }: { wallet: Wallet | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-muted/40" />
        ))}
      </div>
    );
  }

  const holdings    = Object.entries(wallet?.holdings ?? {});
  const hasAnything = Number(wallet?.balance ?? 0) > 0 || holdings.length > 0;

  if (!hasAnything) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        No balances yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="rounded-lg bg-muted/20 p-3">
        <div className="text-xs text-muted-foreground">Cash (INR)</div>
        <div className="text-lg font-semibold text-foreground">
          ₹{fmt(wallet?.balance)}
        </div>
      </div>
      {holdings.map(([asset, qty]) => (
        <div key={asset} className="rounded-lg bg-muted/20 p-3">
          <div className="text-xs text-muted-foreground">{asset}</div>
          <div className="text-lg font-semibold text-foreground">{fmt(qty, 4)}</div>
        </div>
      ))}
    </div>
  );
}

function OpenOrdersTab({
  orders,
  loading,
  cancellingId,
  onCancel,
}: {
  orders:      OpenOrder[];
  loading:     boolean;
  cancellingId: string | null;
  onCancel:    (id: string) => void;
}) {
  if (loading) {
    return (
      <div className="space-y-2 pt-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-full animate-pulse rounded bg-muted/40" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        No open orders
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-xs text-muted-foreground">
          <th className="py-2 text-left">Side</th>
          <th className="py-2 text-left">Price</th>
          <th className="py-2 text-left">Qty</th>
          <th className="py-2 text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.orderId} className="border-b border-border">
            <td className={`py-2.5 font-semibold ${order.side === "buy" ? "text-emerald-500" : "text-red-500"}`}>
              {order.side.toUpperCase()}
            </td>
            <td className="py-2.5 text-foreground">{fmt(order.price)}</td>
            <td className="py-2.5 text-foreground">{fmt(order.quantity, 4)}</td>
            <td className="py-2.5 text-right">
              <Button
                size="sm"
                disabled={cancellingId === order.orderId}
                onClick={() => onCancel(order.orderId)}
                className="h-7 border border-red-500/30 bg-red-500/15 text-xs font-medium text-red-500 hover:bg-red-500/25 disabled:opacity-50">
                {cancellingId === order.orderId ? "Cancelling…" : "Cancel"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function OrderHistoryTab({ orders, loading }: { orders: OrderRecord[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-2 pt-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-full animate-pulse rounded bg-muted/40" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        No order history for this market
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="py-2 text-left">Side</th>
            <th className="py-2 text-left">Type</th>
            <th className="py-2 text-left">Price</th>
            <th className="py-2 text-left">Qty</th>
            <th className="py-2 text-left">Filled</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-border hover:bg-muted/10">
              <td className={`py-2 font-semibold ${o.side === "buy" ? "text-emerald-500" : "text-red-500"}`}>
                {o.side.toUpperCase()}
              </td>
              <td className="py-2 text-muted-foreground capitalize">{o.orderType}</td>
              <td className="py-2 text-foreground">{fmt(o.price)}</td>
              <td className="py-2 text-foreground">{fmt(o.quantity, 4)}</td>
              <td className="py-2 text-foreground">{fmt(o.filledQty, 4)}</td>
              <td className={`py-2 text-xs font-medium ${STATUS_COLORS[o.status] ?? ""}`}>
                {o.status.replace("_", " ")}
              </td>
              <td className="py-2 text-xs text-muted-foreground">
                {new Date(o.createdAt).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
