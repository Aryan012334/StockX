"use client";

import { useEffect, useRef, useState } from "react";
import type { MarketQuote } from "@stockx/shared";
import { getMarketQuote } from "@/lib/utils/apiClient";
import { MarketDataManager } from "@/lib/utils/MarketDataManager";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

export const MarketBar = ({ market }: { market: string }) => {
  // market = "AAPL_USD"
  const symbol = market.split("_")[0] ?? market;

  const [quote,    setQuote]    = useState<MarketQuote | null>(null);
  const [lastTrade, setLastTrade] = useState<string | null>(null);
  const [trend,    setTrend]    = useState<"up" | "down" | "flat">("flat");
  const prevPriceRef = useRef<number | null>(null);

  // Load reference market price
  useEffect(() => {
    getMarketQuote(symbol)
      .then((q) => {
        if (q) setQuote(q);
      })
      .catch(() => {});
  }, [symbol]);

  // Live trade price via WS
  useEffect(() => {
    const manager    = MarketDataManager.getInstance();
    const callbackId = `MBAR-${market}`;

    manager.registerCallback("trade", callbackId, (data: any) => {
      if (data.symbol && data.symbol !== market) return;
      const newPrice = Number(data.price ?? data.lastPrice);
      if (!Number.isNaN(newPrice) && newPrice > 0) {
        if (prevPriceRef.current !== null) {
          setTrend(newPrice > prevPriceRef.current ? "up" : newPrice < prevPriceRef.current ? "down" : "flat");
        }
        prevPriceRef.current = newPrice;
        setLastTrade(newPrice.toFixed(2));
      }
    });

    manager.sendMessage({ method: "SUBSCRIBE", params: [`trade@${market}`] });

    return () => {
      manager.deRegisterCallback("trade", callbackId);
      manager.sendMessage({ method: "UNSUBSCRIBE", params: [`trade@${market}`] });
    };
  }, [market]);

  const refPrice      = quote?.price ?? null;
  const change        = quote?.change ?? 0;
  const changePct     = quote?.changePercent ?? 0;
  const isUp          = change >= 0;
  const priceColor    = trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : isUp ? "text-emerald-400" : "text-red-400";
  const displayPrice  = lastTrade ?? (refPrice !== null ? refPrice.toFixed(2) : null);

  return (
    <div className="h-full w-full flex items-center">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex h-full w-full items-center gap-4 px-3 lg:gap-6 lg:px-4">
          {/* Symbol */}
          <div className="flex shrink-0 flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white">{symbol}</span>
              <span className="text-xs text-zinc-500">/ USD</span>
            </div>
            <span className="text-[10px] text-zinc-600 truncate max-w-[120px]">
              {quote?.companyName ?? symbol}
            </span>
          </div>

          <Separator orientation="vertical" className="h-7 bg-white/10" />

          {/* Price */}
          <div className="flex shrink-0 flex-col justify-center">
            <span className={`text-xl font-bold tabular-nums transition-colors duration-200 ${priceColor}`}>
              {displayPrice ? `$${displayPrice}` : "--"}
            </span>
            {refPrice !== null && (
              <span className={`flex items-center gap-0.5 text-xs font-medium tabular-nums ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                {isUp ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                {isUp ? "+" : ""}{change.toFixed(2)} ({isUp ? "+" : ""}{changePct.toFixed(2)}%)
              </span>
            )}
          </div>

          <Separator orientation="vertical" className="h-7 bg-white/10" />

          {/* OHLV metrics */}
          {[
            { label: "OPEN",       value: refPrice !== null ? `$${(quote?.open ?? 0).toFixed(2)}` : "--" },
            { label: "24H HIGH",   value: refPrice !== null ? `$${(quote?.dayHigh ?? 0).toFixed(2)}` : "--" },
            { label: "24H LOW",    value: refPrice !== null ? `$${(quote?.dayLow ?? 0).toFixed(2)}` : "--" },
            { label: "PREV CLOSE", value: refPrice !== null ? `$${(quote?.previousClose ?? 0).toFixed(2)}` : "--" },
            {
              label: "VOLUME",
              value: quote?.volume
                ? quote.volume >= 1e6
                  ? `${(quote.volume / 1e6).toFixed(2)}M`
                  : quote.volume >= 1e3
                    ? `${(quote.volume / 1e3).toFixed(1)}K`
                    : quote.volume.toFixed(0)
                : "--",
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex min-w-[70px] shrink-0 flex-col justify-center">
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">{label}</span>
              <span className="text-xs font-medium text-zinc-200 tabular-nums">{value}</span>
            </div>
          ))}

          {/* Delayed indicator */}
          {quote?.isDelayed && (
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
              <Clock className="size-2.5" />
              Delayed
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
};
