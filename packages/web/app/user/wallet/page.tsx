"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession }    from "next-auth/react";
import Link              from "next/link";
import { deposit, withdraw, getWalletSummary } from "@/lib/utils/apiClient";
import { prisma }        from "@stockx/execution-service";
import {
  ArrowDownLeft, ArrowUpRight, Wallet,
  Plus, Minus, RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

type TxType = "CREDIT" | "DEBIT";

// We fetch transactions server-side would be cleanest, but the wallet page
// is now client-side for the deposit/withdraw interactivity.
// Transactions are fetched from the wallet API.

// ---------------------------------------------------------------------------
// Quick Deposit/Withdraw modal-like inline form
// ---------------------------------------------------------------------------
function FundsModal({
  mode, onConfirm, onCancel, loading,
}: {
  mode: "deposit" | "withdraw";
  onConfirm: (amount: number) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [amount, setAmount] = useState("");
  const presets = mode === "deposit"
    ? [1000, 5000, 10000, 25000]
    : [500, 1000, 2500, 5000];

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <h3 className="font-semibold text-foreground capitalize">{mode} Funds</h3>
      <div className="flex gap-2 flex-wrap">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setAmount(p.toString())}
            className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-blue-500/50 hover:text-foreground transition">
            ${p.toLocaleString()}
          </button>
        ))}
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="pl-7"
          min="0"
          max={mode === "deposit" ? "1000000" : undefined}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onConfirm(Number(amount))}
          disabled={loading || !amount || Number(amount) <= 0}
          className="flex-1"
          size="sm">
          {loading ? "Processing..." : `Confirm ${mode}`}
        </Button>
        <Button variant="outline" onClick={onCancel} size="sm">Cancel</Button>
      </div>
    </div>
  );
}

export default function WalletPage() {
  const { data: session, status } = useSession();
  const userId = (session?.user as any)?.id as string | undefined;

  const [walletInfo, setWalletInfo] = useState<{ balance: number; lockedBalance: number; availableCash: number } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalTx, setTotalTx] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"deposit" | "withdraw" | null>(null);
  const [txLoading, setTxLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const PAGE_SIZE = 10;

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [summary, txRes] = await Promise.all([
        getWalletSummary(userId),
        fetch(`${process.env.NEXT_PUBLIC_REST_API_URL ?? "http://localhost:13001/api/v1"}/wallet/transactions?userId=${userId}&page=${page}&limit=${PAGE_SIZE}`)
          .then((r) => r.json())
          .catch(() => ({ transactions: [], total: 0 })),
      ]);
      setWalletInfo(summary);
      setTransactions(txRes.transactions ?? []);
      setTotalTx(txRes.total ?? 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId, page]);

  useEffect(() => { if (status === "authenticated") load(); }, [status, load]);

  const handleFunds = async (amount: number) => {
    if (!userId) return;
    setTxLoading(true);
    try {
      if (mode === "deposit")  await deposit(userId, amount);
      if (mode === "withdraw") await withdraw(userId, amount);
      setFeedback({ type: "ok", msg: `${mode === "deposit" ? "Deposited" : "Withdrew"} $${amount.toLocaleString()}` });
      setMode(null);
      await load();
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? "Transaction failed";
      setFeedback({ type: "err", msg });
    } finally {
      setTxLoading(false);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Please <Link href="/login" className="mx-1 text-blue-400 hover:underline">log in</Link> to view your wallet.
      </div>
    );
  }

  const totalPages = Math.ceil(totalTx / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wallet className="size-6 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Wallet</h1>
            <p className="text-sm text-muted-foreground">Simulated cash account</p>
          </div>
        </div>
        <button onClick={load} className="text-zinc-500 hover:text-foreground transition">
          <RefreshCcw className="size-4" />
        </button>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-xs text-muted-foreground">Total Balance</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            ${loading ? "--" : (walletInfo?.balance ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-xs text-muted-foreground">Available Cash</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-400">
            ${loading ? "--" : (walletInfo?.availableCash ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-xs text-muted-foreground">Locked in Orders</p>
          <p className="mt-1 text-2xl font-semibold text-amber-400">
            ${loading ? "--" : (walletInfo?.lockedBalance ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Deposit/Withdraw buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => { setMode("deposit"); setFeedback(null); }}
          className="gap-2 bg-blue-600 hover:bg-blue-500">
          <Plus className="size-4" /> Deposit
        </Button>
        <Button
          variant="outline"
          onClick={() => { setMode("withdraw"); setFeedback(null); }}
          className="gap-2">
          <Minus className="size-4" /> Withdraw
        </Button>
      </div>

      {/* Inline funds modal */}
      {mode && (
        <FundsModal
          mode={mode}
          onConfirm={handleFunds}
          onCancel={() => setMode(null)}
          loading={txLoading}
        />
      )}

      {/* Feedback */}
      {feedback && (
        <div className={`rounded-lg border px-4 py-2.5 text-sm ${
          feedback.type === "ok"
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            : "border-red-500/20 bg-red-500/10 text-red-400"
        }`}>
          {feedback.msg}
        </div>
      )}

      {/* Transaction history */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold text-foreground">Transaction History</h2>
          <span className="text-xs text-muted-foreground">{totalTx} total</span>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 animate-pulse rounded-xl bg-muted/30" />)}
          </div>
        ) : transactions.length === 0 ? (
          <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
            No transactions yet
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                    <th className="px-4 py-3 text-right font-medium">Balance After</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((tx: any) => (
                    <tr key={tx.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          {tx.type === "CREDIT"
                            ? <ArrowDownLeft className="size-3.5 text-emerald-500 shrink-0" />
                            : <ArrowUpRight className="size-3.5 text-red-500 shrink-0" />}
                          <span className="text-foreground">{tx.description}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs capitalize text-muted-foreground">
                        {tx.category?.toLowerCase().replace(/_/g, " ")}
                      </td>
                      <td className={`px-4 py-3.5 text-right font-mono font-medium ${
                        tx.type === "CREDIT" ? "text-emerald-500" : "text-red-500"
                      }`}>
                        {tx.type === "CREDIT" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-muted-foreground">
                        ${Number(tx.balanceAfter).toFixed(2)}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 text-sm">
                <Button
                  variant="outline" size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Button>
                <span className="text-muted-foreground">Page {page} of {totalPages}</span>
                <Button
                  variant="outline" size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
