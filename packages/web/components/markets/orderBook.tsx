"use client";

import { useEffect, useRef, useState } from "react";
import { getDepth } from "@/lib/utils/apiClient";
import { MarketDataManager } from "@/lib/utils/MarketDataManager";

type Level  = [string, string];   // [price, qty]

function mergeLevels(existing: Level[], updates: Level[]): Level[] {
  const map = new Map<string, string>();
  for (const [p, q] of existing) map.set(p, q);
  for (const [p, q] of updates) {
    if (+q === 0) map.delete(p);
    else          map.set(p, q);
  }
  return [...map.entries()];
}

interface DepthRow {
  price: number;
  size:  number;
  total: number;
  depthPct: number;
}

function buildRows(levels: Level[], ascending: boolean, maxTotal: number): DepthRow[] {
  const sorted = [...levels]
    .map(([p, q]) => ({ price: Number(p), size: Number(q) }))
    .filter((r) => r.size > 0)
    .sort((a, b) => ascending ? a.price - b.price : b.price - a.price);

  let running = 0;
  return sorted.slice(0, 14).map((r) => {
    running += r.size;
    return {
      price:    r.price,
      size:     r.size,
      total:    running,
      depthPct: maxTotal > 0 ? Math.min(100, (running / maxTotal) * 100) : 0,
    };
  });
}

export function OrderBook({ market }: { market: string }) {
  const [bids, setBids] = useState<Level[]>([]);
  const [asks, setAsks] = useState<Level[]>([]);
  const [lastPrice, setLastPrice] = useState<number | null>(null);

  const snapshotReady = useRef(false);
  const pendingUpdates = useRef<{ bids?: Level[]; asks?: Level[] }[]>([]);

  useEffect(() => {
    let mounted = true;
    snapshotReady.current = false;
    pendingUpdates.current = [];

    const manager    = MarketDataManager.getInstance();
    const id         = `ob-${market}`;
    const depthStream = `depth@${market}`;
    const tradeStream = `trade@${market}`;

    manager.registerCallback("depth", id, (payload: any) => {
      if (payload.symbol && payload.symbol !== market) return;
      if (!snapshotReady.current) {
        pendingUpdates.current.push({ bids: payload.bids, asks: payload.asks });
        return;
      }
      if (mounted) {
        if (payload.bids?.length) setBids((prev) => mergeLevels(prev, payload.bids));
        if (payload.asks?.length) setAsks((prev) => mergeLevels(prev, payload.asks));
      }
    });

    manager.registerCallback("trade", id, (payload: any) => {
      if (payload.symbol !== market) return;
      const p = Number(payload.price);
      if (!Number.isNaN(p) && mounted) setLastPrice(p);
    });

    manager.sendMessage({ method: "SUBSCRIBE", params: [depthStream, tradeStream] });

    // Load snapshot
    getDepth(market).then((data: any) => {
      if (!mounted) return;
      setBids(data.bids ?? []);
      setAsks(data.asks ?? []);
      snapshotReady.current = true;
      for (const u of pendingUpdates.current) {
        if (u.bids?.length) setBids((prev) => mergeLevels(prev, u.bids!));
        if (u.asks?.length) setAsks((prev) => mergeLevels(prev, u.asks!));
      }
      pendingUpdates.current = [];
    }).catch(() => { snapshotReady.current = true; });

    return () => {
      mounted = false;
      manager.deRegisterCallback("depth", id);
      manager.deRegisterCallback("trade", id);
      manager.sendMessage({ method: "UNSUBSCRIBE", params: [depthStream, tradeStream] });
    };
  }, [market]);

  // Compute rows
  const totalBid = bids.reduce((s, [, q]) => s + Number(q), 0);
  const totalAsk = asks.reduce((s, [, q]) => s + Number(q), 0);
  const maxTotal = Math.max(totalBid, totalAsk);

  const askRows  = buildRows(asks, true,  maxTotal);  // sorted: lowest ask first (top of book)
  const bidRows  = buildRows(bids, false, maxTotal);  // sorted: highest bid first

  const bestAsk  = askRows[0]?.price ?? null;
  const bestBid  = bidRows[0]?.price ?? null;
  const spread   = bestAsk !== null && bestBid !== null ? bestAsk - bestBid : null;
  const spreadPct = spread !== null && bestBid !== null && bestBid > 0
    ? ((spread / bestBid) * 100).toFixed(3)
    : null;

  const bidPct = totalBid + totalAsk > 0
    ? Math.round((totalBid / (totalBid + totalAsk)) * 100)
    : 50;

  function fmtPrice(p: number) { return p >= 100 ? p.toFixed(2) : p.toFixed(4); }
  function fmtSize(s: number)  { return s >= 1000 ? s.toFixed(1) : s.toFixed(4); }

  return (
    <div className="flex h-full flex-col bg-transparent text-xs">
      {/* Header */}
      <div className="grid grid-cols-3 border-b border-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Asks — shown in reverse so lowest is closest to spread */}
        <div className="flex flex-1 flex-col justify-end overflow-hidden">
          {askRows.slice().reverse().map((row, i) => (
            <div key={`ask-${i}`} className="relative grid grid-cols-3 px-3 py-[3px] transition hover:bg-white/5">
              {/* Depth bar */}
              <div
                className="absolute inset-y-0 right-0 bg-red-500/10"
                style={{ width: `${row.depthPct}%` }}
              />
              <span className="relative font-mono text-red-400">{fmtPrice(row.price)}</span>
              <span className="relative text-right font-mono text-zinc-300">{fmtSize(row.size)}</span>
              <span className="relative text-right font-mono text-zinc-500">{fmtSize(row.total)}</span>
            </div>
          ))}
        </div>

        {/* Spread */}
        <div className="flex items-center justify-between border-y border-white/8 bg-[#0F1117] px-3 py-1.5">
          <span className={`flex items-center gap-1 font-mono text-sm font-bold ${
            lastPrice !== null
              ? lastPrice >= (bestBid ?? 0) ? "text-emerald-400" : "text-red-400"
              : "text-zinc-300"
          }`}>
            {lastPrice !== null ? `$${fmtPrice(lastPrice)}` : (bestBid !== null ? `$${fmtPrice(bestBid)}` : "--")}
          </span>
          {spread !== null && (
            <span className="text-[10px] text-zinc-500">
              Spread {fmtPrice(spread)} ({spreadPct}%)
            </span>
          )}
        </div>

        {/* Bids */}
        <div className="flex-1 overflow-hidden">
          {bidRows.map((row, i) => (
            <div key={`bid-${i}`} className="relative grid grid-cols-3 px-3 py-[3px] transition hover:bg-white/5">
              <div
                className="absolute inset-y-0 right-0 bg-emerald-500/10"
                style={{ width: `${row.depthPct}%` }}
              />
              <span className="relative font-mono text-emerald-400">{fmtPrice(row.price)}</span>
              <span className="relative text-right font-mono text-zinc-300">{fmtSize(row.size)}</span>
              <span className="relative text-right font-mono text-zinc-500">{fmtSize(row.total)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bid/Ask percentage bar */}
      <div className="shrink-0 border-t border-white/8">
        <div className="flex h-6 overflow-hidden rounded-b-none">
          <div
            className="flex items-center justify-center bg-emerald-500/20 text-[10px] font-semibold text-emerald-400 transition-all"
            style={{ width: `${bidPct}%` }}>
            {bidPct > 20 && `${bidPct}%`}
          </div>
          <div
            className="flex items-center justify-center bg-red-500/20 text-[10px] font-semibold text-red-400 transition-all"
            style={{ width: `${100 - bidPct}%` }}>
            {100 - bidPct > 20 && `${100 - bidPct}%`}
          </div>
        </div>
      </div>
    </div>
  );
}
