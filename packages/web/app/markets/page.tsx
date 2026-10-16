"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getMarketQuotes,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/utils/apiClient";
import type { MarketQuote } from "@stockx/shared";
import {
  Search, Star, StarOff, TrendingUp, TrendingDown, Activity,
  BarChart2, ChevronUp, ChevronDown,
} from "lucide-react";
import { Sparkline } from "@/components/markets/Sparkline";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(v: number | null | undefined, dp = 2): string {
  if (v === null || v === undefined) return "--";
  return v.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

function fmtCompact(v: number | null | undefined): string {
  if (v === null || v === undefined) return "--";
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9)  return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6)  return `$${(v / 1e6).toFixed(2)}M`;
  return `$${v.toFixed(0)}`;
}

// ---------------------------------------------------------------------------
// Mini Sparkline from change direction
// ---------------------------------------------------------------------------
function MiniSparkline({ changePercent }: { changePercent: number | null }) {
  const isUp = (changePercent ?? 0) >= 0;
  const color = isUp ? "#10b981" : "#ef4444";
  const points = isUp
    ? "0,20 10,15 20,12 30,8 40,10 50,6 60,4 70,8 80,3 90,5 100,1"
    : "0,1 10,4 20,6 30,3 40,8 50,10 60,12 70,15 80,18 90,16 100,20";
  return (
    <svg width="80" height="28" viewBox="0 0 100 24" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Sector badge color map
// ---------------------------------------------------------------------------
const SECTOR_COLORS: Record<string, string> = {
  Technology:             "bg-blue-500/15 text-blue-400",
  "Financial Services":   "bg-green-500/15 text-green-400",
  Healthcare:             "bg-purple-500/15 text-purple-400",
  "Consumer Cyclical":    "bg-orange-500/15 text-orange-400",
  "Consumer Defensive":   "bg-amber-500/15 text-amber-400",
  Industrials:            "bg-sky-500/15 text-sky-400",
  Energy:                 "bg-yellow-500/15 text-yellow-400",
  "Basic Materials":      "bg-lime-500/15 text-lime-400",
  Utilities:              "bg-cyan-500/15 text-cyan-400",
  "Real Estate":          "bg-rose-500/15 text-rose-400",
  "Communication Services": "bg-violet-500/15 text-violet-400",
};

function sectorColor(sector: string | null): string {
  return sector ? (SECTOR_COLORS[sector] ?? "bg-zinc-500/15 text-zinc-400") : "bg-zinc-500/15 text-zinc-400";
}

// Stock logo placeholder
function StockIcon({ symbol }: { symbol: string }) {
  const colors = [
    "bg-blue-500","bg-green-500","bg-purple-500","bg-orange-500",
    "bg-red-500","bg-cyan-500","bg-amber-500","bg-pink-500",
  ];
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) hash = (hash * 31 + symbol.charCodeAt(i)) & 0xffff;
  const bg = colors[hash % colors.length];
  return (
    <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${bg} text-[11px] font-bold text-white`}>
      {symbol.slice(0, 2)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
function StatCard({ label, value, sub, icon: Icon }: {
  label: string; value: string; sub?: string; icon: any;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0F1117] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
          <p className="mt-1.5 text-2xl font-semibold text-white tabular-nums">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
        </div>
        <Icon className="size-4 text-zinc-600" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Market row
// ---------------------------------------------------------------------------
function MarketRow({
  q, onClick, isFav, onToggleFav,
}: {
  q: MarketQuote; onClick: () => void; isFav: boolean; onToggleFav: (e: React.MouseEvent) => void;
}) {
  const isUp    = (q.changePercent ?? 0) >= 0;
  const hasData = q.price !== null;

  return (
    <tr
      onClick={onClick}
      className="group cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.03]">
      <td className="w-10 px-3 py-3.5">
        <button
          onClick={onToggleFav}
          className="text-zinc-600 transition hover:text-amber-400"
          title={isFav ? "Remove from watchlist" : "Add to watchlist"}>
          {isFav
            ? <Star className="size-3.5 fill-amber-400 text-amber-400" />
            : <Star className="size-3.5" />}
        </button>
      </td>
      <td className="px-3 py-3.5">
        <div className="flex items-center gap-3">
          <StockIcon symbol={q.symbol} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{q.companyName ?? q.symbol}</span>
              {q.sector && (
                <span className={`hidden rounded-full px-1.5 py-0.5 text-[10px] font-medium lg:inline ${sectorColor(q.sector ?? null)}`}>
                  {q.sector}
                </span>
              )}
            </div>
            <div className="text-xs text-zinc-500">{q.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3.5 text-right font-mono text-sm font-medium text-white tabular-nums">
        {hasData ? `$${fmt(q.price)}` : "--"}
      </td>
      <td className="hidden px-3 py-3.5 text-right text-sm text-zinc-400 tabular-nums md:table-cell">
        {fmtCompact(q.volume !== null ? q.volume! * (q.price ?? 0) : null)}
      </td>
      <td className="px-3 py-3.5 text-right">
        {hasData ? (
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${
            isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          }`}>
            {isUp ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            {isUp ? "+" : ""}{fmt(q.changePercent)}%
          </span>
        ) : (
          <span className="text-xs text-zinc-600">--</span>
        )}
      </td>
      <td className="hidden px-3 py-3.5 lg:table-cell">
        <div className="flex justify-end">
          {hasData
            ? <MiniSparkline changePercent={q.changePercent} />
            : <div className="h-7 w-20 animate-pulse rounded bg-white/5" />}
        </div>
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Side list card (top gainers / top losers / popular)
// ---------------------------------------------------------------------------
function SideList({ title, icon: Icon, items, onNavigate }: {
  title: string; icon: any; items: MarketQuote[]; onNavigate: (s: string) => void;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0F1117] p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-zinc-500" />
        <span className="text-sm font-medium text-zinc-300">{title}</span>
      </div>
      <div className="space-y-1">
        {items.slice(0, 5).map((q) => {
          const isUp = (q.changePercent ?? 0) >= 0;
          return (
            <button
              key={q.symbol}
              onClick={() => onNavigate(q.symbol)}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 transition hover:bg-white/5">
              <div className="flex items-center gap-2.5">
                <StockIcon symbol={q.symbol} />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{q.symbol}</div>
                  <div className="max-w-[100px] truncate text-[11px] text-zinc-500">
                    {q.companyName}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm text-white">
                  {q.price !== null ? `$${fmt(q.price)}` : "--"}
                </div>
                {q.changePercent !== null && (
                  <div className={`text-xs font-medium ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                    {isUp ? "+" : ""}{fmt(q.changePercent)}%
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

type SortKey = "symbol" | "price" | "change" | "volume";
type Tab     = "all" | "favorites" | "gainers" | "losers";

export default function MarketsPage() {
  const router  = useRouter();
  const session = useSession();
  const userId  = (session.data?.user as any)?.id as string | undefined;

  const [quotes,   setQuotes]   = useState<MarketQuote[]>([]);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [loading,  setLoading]  = useState(true);
  const [query,    setQuery]    = useState("");
  const [tab,      setTab]      = useState<Tab>("all");
  const [sortKey,  setSortKey]  = useState<SortKey>("volume");
  const [sortDir,  setSortDir]  = useState<"asc" | "desc">("desc");

  const loadData = useCallback(async () => {
    const [qs, wl] = await Promise.all([
      getMarketQuotes(),
      userId ? getWatchlist(userId) : Promise.resolve([]),
    ]);
    setQuotes(qs);
    setWatchlist(new Set(wl.map((w) => w.symbol)));
    setLoading(false);
  }, [userId]);

  useEffect(() => { loadData(); }, [loadData]);

  const navigate = (symbol: string) => router.push(`/trade/${symbol}_USD`);

  const toggleFav = async (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation();
    if (!userId) return;
    const isFav = watchlist.has(symbol);
    const next  = new Set(watchlist);
    if (isFav) { next.delete(symbol); await removeFromWatchlist(userId, symbol); }
    else        { next.add(symbol);    await addToWatchlist(userId, symbol); }
    setWatchlist(next);
  };

  // Sorted + filtered rows
  const sorted = useMemo(() => {
    let rows = [...quotes];

    // Tab filter
    if (tab === "favorites")  rows = rows.filter((q) => watchlist.has(q.symbol));
    else if (tab === "gainers") rows = rows.filter((q) => (q.changePercent ?? 0) > 0);
    else if (tab === "losers")  rows = rows.filter((q) => (q.changePercent ?? 0) < 0);

    // Search filter
    const q = query.trim().toLowerCase();
    if (q) rows = rows.filter((r) =>
      r.symbol.toLowerCase().includes(q) || (r.companyName ?? "").toLowerCase().includes(q),
    );

    // Sort
    rows.sort((a, b) => {
      let diff = 0;
      if (sortKey === "symbol")  diff = a.symbol.localeCompare(b.symbol);
      if (sortKey === "price")   diff = (a.price ?? 0) - (b.price ?? 0);
      if (sortKey === "change")  diff = (a.changePercent ?? 0) - (b.changePercent ?? 0);
      if (sortKey === "volume")  diff = (a.volume ?? 0) * (a.price ?? 0) - (b.volume ?? 0) * (b.price ?? 0);
      return sortDir === "asc" ? diff : -diff;
    });

    return rows;
  }, [quotes, tab, query, sortKey, sortDir, watchlist]);

  const topGainers = useMemo(() =>
    [...quotes]
      .filter((q) => q.price !== null && (q.changePercent ?? 0) > 0)
      .sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0))
      .slice(0, 5),
    [quotes]);

  const topLosers = useMemo(() =>
    [...quotes]
      .filter((q) => q.price !== null && (q.changePercent ?? 0) < 0)
      .sort((a, b) => (a.changePercent ?? 0) - (b.changePercent ?? 0))
      .slice(0, 5),
    [quotes]);

  const popular = useMemo(() =>
    quotes
      .filter((q) => ["AAPL","MSFT","NVDA","TSLA","META","AMZN","GOOGL","NFLX"].includes(q.symbol))
      .slice(0, 5),
    [quotes]);

  // Stats
  const totalVol = useMemo(() =>
    quotes.reduce((s, q) => s + (q.volume ?? 0) * (q.price ?? 0), 0), [quotes]);
  const activeCount = quotes.filter((q) => q.price !== null).length;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? (sortDir === "desc" ? <ChevronDown className="inline size-3" /> : <ChevronUp className="inline size-3" />)
      : null;

  return (
    <div className="min-h-screen bg-[#070A0F] text-zinc-100">
      {/* ── Hero ── */}
      <div className="border-b border-white/8 bg-[#0A0D13] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trade stocks,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              without limits.
            </span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Real-time order books, limit &amp; market orders, live matching engine.
            <br className="hidden sm:block" />
            Practice with $50,000 in simulated capital. No real money required.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
              Start trading →
            </Link>
            <button
              onClick={() => router.push("/markets")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:text-white">
              View markets
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="24H Volume"
            value={fmtCompact(totalVol)}
            icon={BarChart2}
          />
          <StatCard
            label="Listed Stocks"
            value={quotes.length.toString()}
            sub="US equities"
            icon={Activity}
          />
          <StatCard
            label="Active Markets"
            value={activeCount.toString()}
            sub="with live quotes"
            icon={Activity}
          />
          <StatCard
            label="Top Gainer"
            value={topGainers[0] ? `+${fmt(topGainers[0].changePercent)}%` : "--"}
            sub={topGainers[0]?.symbol}
            icon={TrendingUp}
          />
        </div>

        {/* ── Three-column: Gainers / Losers / Popular ── */}
        <div className="grid gap-4 lg:grid-cols-3">
          <SideList title="Top Gainers" icon={TrendingUp}   items={topGainers} onNavigate={(s) => navigate(s)} />
          <SideList title="Top Losers"  icon={TrendingDown} items={topLosers}  onNavigate={(s) => navigate(s)} />
          <SideList title="Popular"     icon={Star}         items={popular}    onNavigate={(s) => navigate(s)} />
        </div>

        {/* ── All markets table ── */}
        <div className="rounded-xl border border-white/8 bg-[#0F1117]">
          {/* Table header / tabs / search */}
          <div className="flex flex-col gap-3 border-b border-white/8 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1">
              {(["all","favorites","gainers","losers"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                    tab === t
                      ? "bg-white/10 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}>
                  {t === "favorites" ? "★ Favorites" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stocks..."
                className="h-8 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-xs placeholder-zinc-600 focus:border-blue-500/50 focus:outline-none sm:w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left">
                  <th className="w-10 px-3 py-3" />
                  <th
                    className="cursor-pointer px-3 py-3 text-xs font-medium text-zinc-500 hover:text-zinc-300"
                    onClick={() => handleSort("symbol")}>
                    Name <SortIcon k="symbol" />
                  </th>
                  <th
                    className="cursor-pointer px-3 py-3 text-right text-xs font-medium text-zinc-500 hover:text-zinc-300"
                    onClick={() => handleSort("price")}>
                    Price <SortIcon k="price" />
                  </th>
                  <th
                    className="hidden cursor-pointer px-3 py-3 text-right text-xs font-medium text-zinc-500 hover:text-zinc-300 md:table-cell"
                    onClick={() => handleSort("volume")}>
                    24H Volume <SortIcon k="volume" />
                  </th>
                  <th
                    className="cursor-pointer px-3 py-3 text-right text-xs font-medium text-zinc-500 hover:text-zinc-300"
                    onClick={() => handleSort("change")}>
                    24H Change <SortIcon k="change" />
                  </th>
                  <th className="hidden px-3 py-3 text-right text-xs font-medium text-zinc-500 lg:table-cell">
                    7D Chart
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-3 py-3.5"><div className="h-3.5 w-3.5 animate-pulse rounded bg-white/8" /></td>
                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="size-8 animate-pulse rounded-full bg-white/8" />
                          <div className="space-y-1.5">
                            <div className="h-3.5 w-24 animate-pulse rounded bg-white/8" />
                            <div className="h-2.5 w-12 animate-pulse rounded bg-white/5" />
                          </div>
                        </div>
                      </td>
                      {[...Array(4)].map((_, j) => (
                        <td key={j} className="px-3 py-3.5">
                          <div className="ml-auto h-3.5 w-16 animate-pulse rounded bg-white/8" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : sorted.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-zinc-500">
                      {tab === "favorites"
                        ? "No favorites yet — click ★ on any stock"
                        : `No stocks match "${query}"`}
                    </td>
                  </tr>
                ) : (
                  sorted.map((q) => (
                    <MarketRow
                      key={q.symbol}
                      q={q}
                      onClick={() => navigate(q.symbol)}
                      isFav={watchlist.has(q.symbol)}
                      onToggleFav={(e) => toggleFav(e, q.symbol)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && (
            <div className="border-t border-white/5 px-4 py-2 text-xs text-zinc-600">
              {sorted.length} stocks · Prices from Twelve Data · Delayed when marked
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
