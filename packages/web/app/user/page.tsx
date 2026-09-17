import { getServerSession }             from "next-auth";
import { authOptions }                  from "@/lib/auth";
import { prisma }                       from "@stockx/execution-service";
import { redirect }                     from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button }   from "@/components/ui/button";
import { Badge }    from "@/components/ui/badge";
import { User, Mail, Wallet, Shield, ExternalLink } from "lucide-react";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where:   { email: session.user.email },
    include: { wallet: true, accounts: { select: { provider: true } } },
  });
  if (!user) redirect("/login");

  const initials = (user.name ?? "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const balance = Number(user.wallet?.balance ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });

  const holdings = Object.entries(
    (user.wallet?.assetsHeld as Record<string, number>) ?? {},
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Account overview</p>
      </div>

      {/* Profile Header */}
      <Card className="rounded-2xl border border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <Avatar className="size-24 border border-border md:size-28">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback className="bg-[var(--brand-cyan)]/10 text-2xl font-semibold text-[var(--brand-cyan)]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">{user.name ?? "Trader"}</h2>
                <Badge variant="outline" className="rounded-full border-transparent bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]">
                  Active
                </Badge>
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4" /> {user.email}
              </p>
              <p className="text-sm text-muted-foreground">
                Login via{" "}
                <span className="font-medium capitalize text-foreground">
                  {user.accounts[0]?.provider ?? "credentials"}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Wallet */}
        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[var(--brand-cyan)]/10 p-2">
                <Wallet className="size-5 text-[var(--brand-cyan)]" />
              </div>
              <div>
                <CardTitle className="text-foreground">Wallet</CardTitle>
                <CardDescription>Simulated balance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-4xl font-semibold text-foreground">${balance}</p>
              <p className="mt-1 text-sm text-muted-foreground">INR available</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" disabled>
                <ExternalLink className="mr-2 size-4" /> Deposit
              </Button>
              <Button variant="outline" className="flex-1" disabled>Withdraw</Button>
            </div>
          </CardContent>
        </Card>

        {/* Holdings */}
        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[var(--brand-blue)]/10 p-2">
                <Shield className="size-5 text-[var(--brand-blue)]" />
              </div>
              <div>
                <CardTitle className="text-foreground">Holdings</CardTitle>
                <CardDescription>Current stock positions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {holdings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No holdings yet. Start trading!</p>
            ) : (
              <div className="space-y-2">
                {holdings.map(([asset, qty]) => (
                  <div key={asset} className="flex items-center justify-between rounded-lg bg-muted/20 px-3 py-2">
                    <span className="font-medium text-foreground">{asset}</span>
                    <span className="tabular-nums text-sm text-muted-foreground">{Number(qty).toLocaleString()} shares</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
