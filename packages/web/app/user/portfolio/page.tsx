"use client";

import { useEffect, useState } from "react";
import { useSession }           from "next-auth/react";
import Link                     from "next/link";
import { getHoldings, getWalletSummary } from "@/lib/utils/apiClient";
import type { HoldingRecord }   from "@stockx/shared";
import { Briefcase, TrendingUp, TrendingDown, Clock, RefreshCcw } from "lucide-react";

function fmt(v: number | null | undefined, dp = 2): string {
  if (v === null || v === undefined) return "--";
  return v.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

function PnlBadge({ value, pct }: { value: number | null; pct?: number | null }) {
  if (value === null) return <span className="text-zinc-500 text-xs">--</span>;
  const isUp = value >= 0;
  return (
    <div className={`text-right ${isUp ? "text-emerald-400" : "text-red-400"}`}>
      <div className="text-sm font-mono">
        {isUp ? "+" : ""}${fmt(Math.abs(value))}
      </div>
      {pct !== undefined && pct !== null && (
        <div className="text-xs">
          {isUp ? "+" : ""}{fmt(pct)}%
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const userId = (session?.user as any)?.id as string | undefined;

  const [holdings,  setHoldings]  = useState<HoldingRecord[]>([]);
  const [cashBal,   setCashBal]   = useState<number | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const load = async (showLoading = false) => {
    if (!userId) return;
    if (showLoading) setLoading(true);
    try {
      const [h, w] = await Promise.all([getHoldings(userId), getWalletSummary(userId)]);
      setHoldings(h);
      setCashBal(w.availableCash);
      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    load(true);
    // Auto-refresh every 5s so holdings update immediately after a trade
    const interval = setInterval(() => load(false), 5000);
    return () => clearInterval(interval);
  }, [userId, status]);

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Please <Link href="/login" className="mx-1 text-blue-400 hover:underline">log in</Link> to view your portfolio.
      </div>
    );
  }

  const totalInvested      = holdings.reduce((s, h) => s + h.invested, 0);
  const totalCurrentValue  = holdings.reduce((s, h) => s + (h.currentValue ?? h.invested), 0);
  const totalUnrealized    = holdings.reduce((s, h) => s + (h.unrealizedPnl ?? 0), 0);
  const totalRealized      = holdings.reduce((s, h) => s + h.realizedPnl, 0);
  const totalAccountValue  = totalCurrentValue + (cashBal ?? 0);
  const hasDelayed         = holdings.some((h) => h.isDelayed);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Briefcase className="size-6 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Portfolio</h1>
            <p className="text-sm text-muted-foreground">Your open positions and performance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {lastRefresh && (
            <span className="text-xs text-muted-foreground">
              Updated {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => load(false)}
            className="text-zinc-500 hover:text-foreground transition"
            title="Refresh">
            <RefreshCcw className="size-4" />
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Account Value", value: totalAccountValue, highlight: true },
          { label: "Cash Available",      value: cashBal ?? 0 },
          { label: "Invested Value",       value: totalInvested },
          { label: "Unrealized P&L",      value: totalUnrealized, pnl: true },
        ].map(({ label, value, highlight, pnl }) => (
          <div key={label} className="rounded-xl border border-border bg-card px-5 py-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`mt-1.5 text-2xl font-semibold tabular-nums ${
              pnl
                ? value >= 0 ? "text-emerald-400" : "text-red-400"
                : highlight ? "text-foreground" : "text-foreground"
            }`}>
              {pnl && value > 0 ? "+" : ""}${fmt(Math.abs(value))}
            </p>
          </div>
        ))}
      </div>

      {/* Holdings table */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold text-foreground">Holdings</h2>
          <div className="flex items-center gap-2">
            {hasDelayed && (
              <div className="flex items-center gap-1 text-xs text-amber-400">
                <Clock className="size-3" /> Prices delayed
              </div>
            )}
            <span className="text-xs text-muted-foreground">
              {holdings.filter((h) => h.quantity > 0).length} positions
            </span>
          </div>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-muted/30" />
            ))}
          </div>
        ) : holdings.length === 0 ? (
          <div className="rounded-xl border border-border bg-card py-16 text-center">
            <p className="text-sm text-muted-foreground">No positions yet.</p>
            <Link href="/markets" className="mt-2 inline-block text-sm font-medium text-blue-400 hover:underline">
              Browse markets →
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    {["Stock","Qty","Avg Cost","Current Price","Invested","Mkt Value","Unrealized P&L","Realized P&L"].map((h) => (
                      <th key={h} className={`px-4 py-3 font-medium ${h === "Stock" ? "text-left" : "text-right"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {holdings.filter((h) => h.quantity > 0).map((h) => (
                    <tr key={h.symbol} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/trade/${h.symbol}_USD`}
                          className="flex items-center gap-2 group">
                          <div className="flex size-7 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400">
                            {h.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-blue-400">{h.symbol}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[100px]">{h.companyName}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono">{h.quantity}</td>
                      <td className="px-4 py-3.5 text-right font-mono">${fmt(h.averageCost)}</td>
                      <td className="px-4 py-3.5 text-right font-mono">
                        {h.currentPrice !== null ? `$${fmt(h.currentPrice)}` : "--"}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono">${fmt(h.invested)}</td>
                      <td className="px-4 py-3.5 text-right font-mono">
                        {h.currentValue !== null ? `$${fmt(h.currentValue)}` : "--"}
                      </td>
                      <td className="px-4 py-3.5">
                        <PnlBadge value={h.unrealizedPnl} pct={h.unrealizedPnlPct} />
                      </td>
                      <td className="px-4 py-3.5">
                        <PnlBadge value={h.realizedPnl} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border bg-muted/10">
                    <td colSpan={5} className="px-4 py-3 text-xs font-medium text-muted-foreground">Total</td>
                    <td className="px-4 py-3 text-right font-mono text-sm font-medium">${fmt(totalCurrentValue)}</td>
                    <td className="px-4 py-3">
                      <PnlBadge value={totalUnrealized} />
                    </td>
                    <td className="px-4 py-3">
                      <PnlBadge value={totalRealized} />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
