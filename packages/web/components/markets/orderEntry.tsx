"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { isAxiosError } from "axios";
import type { MarketQuote } from "@stockx/shared";
import { getMarketQuote, placeOrder, getWalletSummary } from "@/lib/utils/apiClient";
import { MarketDataManager } from "@/lib/utils/MarketDataManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface OrderEntryProps { market: string; }

export function OrderEntry({ market }: OrderEntryProps) {
  const { data: session, status } = useSession();

  const symbol     = market.split("_")[0] ?? market;
  const quoteAsset = market.split("_")[1] ?? "USD";

  const [side,    setSide]    = useState<"buy" | "sell">("buy");
  const [type,    setType]    = useState<"limit" | "market">("limit");
  const [price,   setPrice]   = useState("");
  const [quantity, setQty]    = useState("");
  const [refPrice, setRefPrice] = useState(0);
  const [livePrice, setLivePrice] = useState(0);

  const [availableCash,   setAvailableCash]   = useState(0);
  const [availableShares, setAvailableShares] = useState(0);
  const [walletLoading,   setWalletLoading]   = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [result,     setResult]     = useState<any>(null);

  const userId = (session?.user as any)?.id as string | undefined;
  const isBuy  = side === "buy";
  const isLmt  = type === "limit";

  // Reference market price
  useEffect(() => {
    getMarketQuote(symbol).then((q) => {
      if (q?.price) { setRefPrice(q.price); setLivePrice(q.price); }
    });
  }, [symbol]);

  // Live trade price via WS
  useEffect(() => {
    const manager    = MarketDataManager.getInstance();
    const callbackId = `OE-${market}`;
    manager.registerCallback("trade", callbackId, (data: any) => {
      if (data.symbol !== market) return;
      const p = Number(data.price ?? data.lastPrice);
      if (p > 0) setLivePrice(p);
    });
    manager.sendMessage({ method: "SUBSCRIBE", params: [`trade@${market}`] });
    return () => {
      manager.deRegisterCallback("trade", callbackId);
      manager.sendMessage({ method: "UNSUBSCRIBE", params: [`trade@${market}`] });
    };
  }, [market]);

  // Load wallet
  const refreshWallet = async () => {
    if (!userId) return;
    setWalletLoading(true);
    try {
      const w = await getWalletSummary(userId);
      setAvailableCash(w.availableCash);
      // Holdings available shares would need a separate call — use 0 as safe default
    } catch {}
    finally { setWalletLoading(false); }
  };

  useEffect(() => { if (session) refreshWallet(); }, [session]);

  const execPrice   = isLmt ? (parseFloat(price) || livePrice) : livePrice;
  const qty         = parseFloat(quantity) || 0;
  const totalValue  = execPrice * qty;
  const insufficient = isBuy
    ? totalValue > availableCash
    : qty > availableShares;

  const canSubmit = !!session && !submitting && qty > 0 && execPrice > 0 && !insufficient;

  function setMax() {
    if (isBuy) {
      if (execPrice <= 0) return;
      const maxQty = Math.floor((availableCash / execPrice) * 1000) / 1000;
      setQty(maxQty.toString());
    } else {
      setQty(availableShares.toString());
    }
  }

  async function handleSubmit() {
    if (!canSubmit || !userId) return;
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await placeOrder({
        userId,
        symbol:    market,
        side,
        orderType: type,
        price:     execPrice.toString(),
        quantity:  qty.toString(),
        orderId:   crypto.randomUUID(),
      });
      setResult(res);
      setQty("");
      if (isLmt) setPrice("");
      await refreshWallet();
    } catch (err) {
      const msg =
        (isAxiosError(err) && (err.response?.data?.error || err.response?.data?.message)) ||
        (err instanceof Error ? err.message : "Order failed");
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
        <p className="text-sm text-zinc-400 text-center">Sign in to place orders</p>
        <Button onClick={() => signIn()} className="w-full" size="sm">Sign In</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Buy / Sell tabs */}
      <div className="flex rounded-lg border border-white/8 overflow-hidden">
        <button
          onClick={() => { setSide("buy"); setError(null); setResult(null); }}
          className={`flex-1 py-2.5 text-sm font-semibold transition ${
            isBuy ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}>
          Buy
        </button>
        <button
          onClick={() => { setSide("sell"); setError(null); setResult(null); }}
          className={`flex-1 py-2.5 text-sm font-semibold transition ${
            !isBuy ? "bg-red-500/20 text-red-400" : "text-zinc-500 hover:text-zinc-300"
          }`}>
          Sell
        </button>
      </div>

      {/* Order type */}
      <Tabs value={type} onValueChange={(v) => setType(v as "limit" | "market")}>
        <TabsList className="grid w-full grid-cols-2 h-8 bg-white/5">
          <TabsTrigger value="limit"  className="text-xs">Limit</TabsTrigger>
          <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
        </TabsList>

        <TabsContent value="limit" className="mt-3 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-500">Limit Price (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={livePrice > 0 ? livePrice.toFixed(2) : "0.00"}
                className="pl-6 text-sm"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-3">
          <div className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-xs text-zinc-400">
            Executes at best available price. Current reference: <span className="text-white">${livePrice.toFixed(2)}</span>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quantity */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-zinc-500">Quantity ({symbol})</Label>
          <button onClick={setMax} className="text-[10px] text-blue-400 hover:text-blue-300">
            MAX
          </button>
        </div>
        <Input
          type="number"
          step="1"
          min="0"
          value={quantity}
          onChange={(e) => setQty(e.target.value)}
          placeholder="0"
          className="text-sm"
        />
      </div>

      {/* Estimated total */}
      <div className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-zinc-500">Estimated Total</span>
          <span className="font-mono text-white">${totalValue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">{isBuy ? "Available Cash" : "Available Shares"}</span>
          <span className={`font-mono ${insufficient ? "text-red-400" : "text-zinc-300"}`}>
            {isBuy ? `$${availableCash.toFixed(2)}` : `${availableShares} ${symbol}`}
          </span>
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full font-semibold ${
          isBuy
            ? "bg-emerald-600 hover:bg-emerald-500 text-white disabled:bg-emerald-900/40 disabled:text-emerald-700"
            : "bg-red-600 hover:bg-red-500 text-white disabled:bg-red-900/40 disabled:text-red-700"
        }`}>
        {submitting ? "Placing..." : isBuy ? `Buy ${symbol}` : `Sell ${symbol}`}
      </Button>

      {/* Feedback */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
          {error}
        </div>
      )}
      {result && (
        <div className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
          {result.remainingQty === 0
            ? `Filled ${result.executedQty} ${symbol} @ $${result.fills?.[0]?.price ?? "market"}`
            : result.executedQty > 0
              ? `Partially filled ${result.executedQty}/${Number(result.executedQty) + Number(result.remainingQty)} ${symbol}`
              : `Order placed — resting on book`}
        </div>
      )}
    </div>
  );
}
