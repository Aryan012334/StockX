"use client";

// ---------------------------------------------------------------------------
// TVChart — professional OHLCV candlestick chart
//
// Data source priority:
//   1. Twelve Data candles via GET /api/v1/market/candles/:symbol
//      (real OHLCV, cached 5 min in Redis)
//   2. StockX trade history (built into candles client-side) as fallback
//
// Real-time: incoming WS trade events update the current candle bucket.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { ChartManager, type Candle } from "@/lib/utils/chartManager";
import { getCandles, getPriceHistory } from "@/lib/utils/apiClient";
import { MarketDataManager }           from "@/lib/utils/MarketDataManager";
import { Button }                      from "@/components/ui/button";
import { CandlestickChart, LineChart } from "lucide-react";
import type { OhlcCandle }             from "@stockx/shared";

type Interval  = "1min" | "5min" | "15min" | "1h" | "4h" | "1day" | "1week";
type ChartType = "candlestick" | "line";

const INTERVALS: { label: string; value: Interval; outputsize: number }[] = [
  { label: "1m",  value: "1min",  outputsize: 200 },
  { label: "5m",  value: "5min",  outputsize: 200 },
  { label: "15m", value: "15min", outputsize: 200 },
  { label: "1H",  value: "1h",    outputsize: 180 },
  { label: "4H",  value: "4h",    outputsize: 120 },
  { label: "1D",  value: "1day",  outputsize: 252 },
  { label: "1W",  value: "1week", outputsize: 104 },
];

// Build OHLCV candles from StockX trade list (fallback when no API key)
function buildCandlesFromTrades(
  trades: { price: string; quantity: string; timestamp: number }[],
  intervalMs: number,
): Candle[] {
  const map = new Map<number, Candle>();
  const sorted = [...trades].sort((a, b) => a.timestamp - b.timestamp);
  for (const t of sorted) {
    const price  = Number(t.price);
    const qty    = Number(t.quantity);
    const bucket = Math.floor(t.timestamp / intervalMs) * intervalMs;
    const existing = map.get(bucket);
    if (!existing) {
      map.set(bucket, { timestamp: bucket, open: price, high: price, low: price, close: price, volume: qty });
    } else {
      existing.high   = Math.max(existing.high, price);
      existing.low    = Math.min(existing.low,  price);
      existing.close  = price;
      existing.volume += qty;
    }
  }
  return [...map.values()].sort((a, b) => a.timestamp - b.timestamp);
}

const CHART_TEXT = "#6b7280";

export function TVChart({ market }: { market: string }) {
  const symbol = market.split("_")[0] ?? market;

  const chartRef      = useRef<HTMLDivElement>(null);
  const chartMgrRef   = useRef<ChartManager | null>(null);
  const lastCandleRef = useRef<Candle | null>(null);
  const dataRef       = useRef<Candle[]>([]);

  const [interval,  setIntervalState] = useState<Interval>("1day");
  const [chartType, setChartType]     = useState<ChartType>("candlestick");
  const [loading,   setLoading]       = useState(false);
  const [source,    setSource]        = useState<"live" | "trades" | "none">("none");

  // Load historical data
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    lastCandleRef.current = null;

    const iv = INTERVALS.find((i) => i.value === interval)!;
    const intervalMs: Record<Interval, number> = {
      "1min":  60_000, "5min": 300_000, "15min": 900_000,
      "1h":  3_600_000, "4h": 14_400_000, "1day": 86_400_000, "1week": 604_800_000,
    };

    const loadChart = async () => {
      // Try Twelve Data first
      const apiCandles: OhlcCandle[] = await getCandles(symbol, interval, iv.outputsize);

      if (apiCandles.length > 0) {
        if (cancelled || !chartRef.current) return;
        const candles: Candle[] = apiCandles.map((c) => ({
          timestamp: c.time * 1000,
          open:   c.open,
          high:   c.high,
          low:    c.low,
          close:  c.close,
          volume: c.volume,
        }));
        dataRef.current = candles;
        chartMgrRef.current?.destroy();
        chartMgrRef.current = new ChartManager(chartRef.current, candles, {
          background: "transparent", textColor: CHART_TEXT, seriesType: chartType,
        });
        lastCandleRef.current = candles[candles.length - 1] ?? null;
        setSource("live");
      } else {
        // Fallback: build candles from StockX trade history
        const trades = await getPriceHistory(market, 500).catch(() => []);
        if (cancelled || !chartRef.current) return;
        if (trades.length > 0) {
          const candles = buildCandlesFromTrades(trades, intervalMs[interval]);
          dataRef.current = candles;
          chartMgrRef.current?.destroy();
          chartMgrRef.current = new ChartManager(chartRef.current, candles, {
            background: "transparent", textColor: CHART_TEXT, seriesType: chartType,
          });
          lastCandleRef.current = candles[candles.length - 1] ?? null;
          setSource("trades");
        } else {
          setSource("none");
        }
      }
      setLoading(false);
    };

    loadChart().catch((err) => {
      if (!cancelled) { console.error("[TVChart]", err); setLoading(false); }
    });

    return () => {
      cancelled = true;
      chartMgrRef.current?.destroy();
      chartMgrRef.current = null;
    };
  }, [market, symbol, interval]);

  // Re-render on chartType change
  useEffect(() => {
    if (!chartRef.current || dataRef.current.length === 0) return;
    chartMgrRef.current?.destroy();
    chartMgrRef.current = new ChartManager(chartRef.current, dataRef.current, {
      background: "transparent", textColor: CHART_TEXT, seriesType: chartType,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType]);

  // Stream real-time trade events → update current candle bucket
  useEffect(() => {
    const manager    = MarketDataManager.getInstance();
    const callbackId = `CHART-${market}-${interval}`;
    const intervalMs: Record<Interval, number> = {
      "1min":  60_000, "5min": 300_000, "15min": 900_000,
      "1h":  3_600_000, "4h": 14_400_000, "1day": 86_400_000, "1week": 604_800_000,
    };
    const ms = intervalMs[interval];

    manager.registerCallback("trade", callbackId, (payload: any) => {
      if (!chartMgrRef.current) return;
      const price  = Number(payload.price ?? payload.p ?? payload.lastPrice);
      const volume = Number(payload.quantity ?? payload.q ?? 0);
      const time   = Number(payload.timestamp ?? payload.T ?? Date.now());
      if (!Number.isFinite(price) || price <= 0) return;

      const bucket = Math.floor(time / ms) * ms;

      if (!lastCandleRef.current) {
        const candle: Candle = { timestamp: bucket, open: price, high: price, low: price, close: price, volume };
        lastCandleRef.current = candle;
        dataRef.current = [...dataRef.current, candle];
        chartMgrRef.current.update(candle);
        return;
      }

      const cur = lastCandleRef.current;
      let candle: Candle;
      if (time < cur.timestamp + ms) {
        candle = { ...cur, close: price, high: Math.max(cur.high, price), low: Math.min(cur.low, price), volume: cur.volume + volume };
        dataRef.current = [...dataRef.current.slice(0, -1), candle];
      } else {
        candle = { timestamp: bucket, open: price, high: price, low: price, close: price, volume };
        dataRef.current = [...dataRef.current, candle];
      }
      lastCandleRef.current = candle;
      chartMgrRef.current.update(candle);
    });

    manager.sendMessage({ method: "SUBSCRIBE", params: [`trade@${market}`] });

    return () => {
      manager.deRegisterCallback("trade", callbackId);
      manager.sendMessage({ method: "UNSUBSCRIBE", params: [`trade@${market}`] });
    };
  }, [market, interval]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-3 py-1.5">
        {/* Interval buttons */}
        <div className="flex gap-0.5">
          {INTERVALS.map((iv) => (
            <Button
              key={iv.value}
              variant="ghost"
              size="sm"
              onClick={() => setIntervalState(iv.value)}
              className={`h-6 px-2 text-[11px] font-medium ${
                iv.value === interval
                  ? "bg-white/10 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}>
              {iv.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Source indicator */}
          {source === "trades" && (
            <span className="text-[10px] text-amber-400">SimX data</span>
          )}
          {source === "live" && (
            <span className="text-[10px] text-emerald-400">Market data</span>
          )}

          {/* Chart type */}
          <div className="flex gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType("candlestick")}
              className={`h-6 w-6 p-0 ${chartType === "candlestick" ? "bg-white/10 text-white" : "text-zinc-500"}`}>
              <CandlestickChart className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType("line")}
              className={`h-6 w-6 p-0 ${chartType === "line" ? "bg-white/10 text-white" : "text-zinc-500"}`}>
              <LineChart className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chart area */}
      <div className="relative flex-1">
        <div
          ref={chartRef}
          className="absolute inset-0"
          style={{ opacity: loading ? 0.3 : 1, transition: "opacity 0.3s" }}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-zinc-500">Loading chart...</div>
          </div>
        )}
        {!loading && source === "none" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-zinc-400">No chart data available</div>
              <div className="mt-1 text-xs text-zinc-600">
                Place orders to generate price history
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
