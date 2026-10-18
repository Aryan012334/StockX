import { getServerSession }                      from "next-auth";
import { authOptions }                            from "@/lib/auth";
import { prisma }                                 from "@stockx/execution-service";
import { redirect }                               from "next/navigation";
import Link                                       from "next/link";
import { Avatar, AvatarFallback, AvatarImage }   from "@/components/ui/avatar";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button }   from "@/components/ui/button";
import { Badge }    from "@/components/ui/badge";
import { Mail, Wallet, TrendingUp, ExternalLink, ArrowRight } from "lucide-react";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where:   { email: session.user.email },
    include: {
      wallet:   true,
      accounts: { select: { provider: true } },
      holdings: {
        where:   { quantity: { gt: 0 } },
        orderBy: { symbol: "asc" },
        take: 5,
      },
    },
  });
  if (!user) redirect("/login");

  const initials = (user.name ?? "U")
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const balance       = Number(user.wallet?.balance ?? 0);
  const lockedBalance = Number(user.wallet?.lockedBalance ?? 0);
  const available     = Math.max(0, balance - lockedBalance);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Account overview</p>
      </div>

      {/* Profile card */}
      <Card className="rounded-2xl border border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <Avatar className="size-20 border border-border">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback className="bg-blue-500/10 text-xl font-semibold text-blue-400">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">{user.name ?? "Trader"}</h2>
                <Badge variant="outline" className="rounded-full border-transparent bg-emerald-500/10 text-emerald-400 text-xs">
                  Active
                </Badge>
              </div>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5" /> {user.email}
              </p>
              <p className="text-xs text-muted-foreground">
                Signed in via{" "}
                <span className="capitalize text-foreground">{user.accounts[0]?.provider ?? "email"}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Wallet summary */}
        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Wallet className="size-4 text-[var(--brand-cyan)]" />
              <CardTitle className="text-sm text-foreground">Wallet</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-3xl font-semibold tabular-nums text-foreground">
                ${available.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Available cash{lockedBalance > 0 ? ` · $${lockedBalance.toFixed(2)} locked` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/user/wallet" className="flex-1">
                <Button size="sm" className="w-full gap-1.5">
                  <ExternalLink className="size-3.5" /> Manage Wallet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Holdings summary */}
        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-emerald-400" />
                <CardTitle className="text-sm text-foreground">Holdings</CardTitle>
              </div>
              <Link href="/user/portfolio" className="text-xs text-blue-400 hover:underline">
                View all →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {user.holdings.length === 0 ? (
              <div className="py-4 text-center">
                <p className="text-sm text-muted-foreground">No positions yet.</p>
                <Link href="/markets" className="mt-1 inline-block text-xs text-blue-400 hover:underline">
                  Browse markets
                </Link>
              </div>
            ) : (
              <div className="space-y-1.5">
                {user.holdings.map((h) => (
                  <div key={h.symbol} className="flex items-center justify-between rounded-lg bg-muted/20 px-3 py-2">
                    <Link href={`/trade/${h.symbol}_USD`} className="flex items-center gap-2 hover:text-blue-400">
                      <div className="flex size-6 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400">
                        {h.symbol.slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-foreground">{h.symbol}</span>
                    </Link>
                    <span className="font-mono text-sm text-muted-foreground">
                      {Number(h.quantity)} shares
                    </span>
                  </div>
                ))}
                {user.holdings.length >= 5 && (
                  <Link href="/user/portfolio" className="flex items-center gap-1 pt-1 text-xs text-blue-400 hover:underline">
                    View all holdings <ArrowRight className="size-3" />
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
