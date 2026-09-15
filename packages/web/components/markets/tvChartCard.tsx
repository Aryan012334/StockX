"use client";

// ---------------------------------------------------------------------------
// TVChart — price chart built from the trade history endpoint.
//
// Instead of TimescaleDB klines views, we fetch recent trades from
// GET /api/v1/price/history/:symbol and bucket them client-side into OHLCV
// candles at the chosen interval.  Real-time updates arrive via WebSocket
// trade events and are merged into the current candle bucket in-memory.
//
// This approach removes the TimescaleDB dependency while keeping a fully
// functional candlestick/line chart with live streaming updates.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { ChartManager, type Candle } from "@/lib/utils/chartManager";
import { getPriceHistory }            from "@/lib/utils/apiClient";
import { MarketDataManager }           from "@/lib/utils/MarketDataManager";
import { Button }                      from "@/components/ui/button";
import { CandlestickChart, LineChart } from "lucide-react";

type Interval = "1m" | "5m" | "1h" | "1d";
type ChartType = "candlestick" | "line";

const INTERVAL_MS: Record<Interval, number> = {
  "1m":  60_000,
  "5m":  300_000,
  "1h":  3_600_000,
  "1d":  86_400_000,
};

const INTERVALS: Interval[] = ["1m", "5m", "1h", "1d"];

const CHART_TEXT_COLOR = "#8f949e";

// ---------------------------------------------------------------------------
// Aggregate raw trades into OHLCV candle buckets
// ---------------------------------------------------------------------------
function buildCandles(
  trades: { price: string; quantity: string; timestamp: number }[],
  intervalMs: number,
): Candle[] {
  const bucketsMap = new Map<number, Candle>();

  // trades come newest-first from the API — process oldest first
  const sorted = [...trades].sort((a, b) => a.timestamp - b.timestamp);

  for (const t of sorted) {
    const price = Number(t.price);
    const qty   = Number(t.quantity);
    const bucket = Math.floor(t.timestamp / intervalMs) * intervalMs;

    const existing = bucketsMap.get(bucket);
    if (!existing) {
      bucketsMap.set(bucket, {
        timestamp: bucket,
        open:  price,
        high:  price,
        low:   price,
        close: price,
        volume: qty,
      });
    } else {
      existing.high   = Math.max(existing.high, price);
      existing.low    = Math.min(existing.low,  price);
      existing.close  = price;
      existing.volume += qty;
    }
  }

  return Array.from(bucketsMap.values()).sort((a, b) => a.timestamp - b.timestamp);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function TVChart({ market }: { market: string }) {
  const chartRef       = useRef<HTMLDivElement>(null);
  const chartMgrRef    = useRef<ChartManager | null>(null);
  const lastCandleRef  = useRef<Candle | null>(null);
  const dataRef        = useRef<Candle[]>([]);

  const [interval,  setIntervalState] = useState<Interval>("1m");
  const [chartType, setChartType]     = useState<ChartType>("candlestick");
  const [loading,   setLoading]       = useState(false);

  // Load historical trades → build candles → render chart
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    lastCandleRef.current = null;

    getPriceHistory(market, 500)
      .then((trades) => {
        if (cancelled || !chartRef.current) return;

        const candles = buildCandles(trades, INTERVAL_MS[interval]);
        dataRef.current = candles;

        chartMgrRef.current?.destroy();
        chartMgrRef.current = new ChartManager(chartRef.current, candles, {
          background:  "transparent",
          textColor:   CHART_TEXT_COLOR,
          seriesType:  chartType,
        });

        lastCandleRef.current = candles.length > 0
          ? candles[candles.length - 1]!
          : null;
      })
      .catch((err) => {
        if (!cancelled) console.error("[TVChart] Failed to load price history:", err);
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => {
      cancelled = true;
      chartMgrRef.current?.destroy();
      chartMgrRef.current = null;
    };
  }, [market, interval]); // chartType intentionally excluded — handled below

  // Re-render with same data when chartType changes (no new fetch)
  useEffect(() => {
    if (!chartRef.current || dataRef.current.length === 0) return;
    chartMgrRef.current?.destroy();
    chartMgrRef.current = new ChartManager(chartRef.current, dataRef.current, {
      background: "transparent",
      textColor:  CHART_TEXT_COLOR,
      seriesType: chartType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType]);

  // Stream real-time trade events and merge into current candle bucket
  useEffect(() => {
    const manager    = MarketDataManager.getInstance();
    const callbackId = `CHART-${market}-${interval}`;
    const ms         = INTERVAL_MS[interval];

    manager.registerCallback("trade", callbackId, (payload: any) => {
      if (!chartMgrRef.current) return;

      const price  = Number(payload.price ?? payload.p ?? payload.lastPrice);
      const volume = Number(payload.quantity ?? payload.q ?? 0);
      const time   = Number(payload.timestamp ?? payload.T ?? Date.now());

      if (!Number.isFinite(price) || price <= 0) return;

      const bucket = Math.floor(time / ms) * ms;

      if (!lastCandleRef.current) {
        const candle: Candle = {
          timestamp: bucket, open: price, high: price, low: price, close: price, volume,
        };
        lastCandleRef.current = candle;
        dataRef.current = [...dataRef.current, candle];
        chartMgrRef.current.update(candle);
        return;
      }

      const cur = lastCandleRef.current;
      let candle: Candle;

      if (time < cur.timestamp + ms) {
        // Same candle bucket — update OHLCV
        candle = {
          ...cur,
          close:  price,
          high:   Math.max(cur.high, price),
          low:    Math.min(cur.low,  price),
          volume: cur.volume + volume,
        };
        dataRef.current = [...dataRef.current.slice(0, -1), candle];
      } else {
        // New candle bucket
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
    <div className="flex h-full w-full min-h-0 min-w-0 flex-col overflow-hidden rounded-lg bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex gap-1">
          {INTERVALS.map((iv) => (
            <Button
              key={iv}
              variant="ghost"
              size="sm"
              onClick={() => setIntervalState(iv)}
              className={`h-7 px-2 text-xs ${
                iv === interval
                  ? "bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {iv.toUpperCase()}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setChartType("candlestick")}
            aria-label="Candlestick chart"
            className={`h-7 w-7 p-0 ${
              chartType === "candlestick"
                ? "bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            <CandlestickChart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setChartType("line")}
            aria-label="Line chart"
            className={`h-7 w-7 p-0 ${
              chartType === "line"
                ? "bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            <LineChart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chart container */}
      <div className="relative w-full flex-1">
        <div
          ref={chartRef}
          className="absolute inset-0"
          style={{ opacity: loading ? 0.4 : 1, transition: "opacity 0.2s" }}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Loading chart...</span>
          </div>
        )}
      </div>
    </div>
  );
}
