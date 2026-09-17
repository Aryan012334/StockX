"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileMenu from "@/components/profileMenu";
import { useSession } from "next-auth/react";
import { getMarketQuotes } from "@/lib/utils/apiClient";
import type { MarketQuote } from "@stockx/shared";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;

  const [tickers, setTickers] = useState<MarketQuote[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const ensureTickersLoaded = () => {
    if (hasFetched) return;
    setHasFetched(true);
    getMarketQuotes()
      .then(setTickers)
      .catch(() => setTickers([]));
  };

  const results =
    query.trim().length === 0
      ? []
      : tickers
          .filter((t) =>
            t.symbol.toLowerCase().includes(query.trim().toLowerCase()),
          )
          .slice(0, 6);

  // Close the dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToMarket(symbol: string) {
    setQuery("");
    setIsOpen(false);
    // Append _USD if not already a market symbol
    const marketSymbol = symbol.includes("_") ? symbol : `${symbol}_USD`;
    router.push(`/trade/${marketSymbol}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && results.length > 0) {
      goToMarket(results[0].symbol);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="StockX logo"
              width={170}
              height={60}
              priority
            />
          </Link>

          <div className="hidden md:flex gap-4 text-sm text-foreground">
            <Link href="/markets">Markets</Link>
            <Link href="/user/portfolio">Portfolio</Link>
            <Link href="/user/wallet">Wallet</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div ref={searchRef} className="relative hidden md:block">
            <Input
              placeholder="Search markets"
              className="w-56"
              value={query}
              onFocus={() => {
                ensureTickersLoaded();
                setIsOpen(true);
              }}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
            />

            {isOpen && query.trim().length > 0 && (
              <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                {results.length > 0 ? (
                  results.map((t) => {
                    const [base] = t.symbol.split("_");
                    return (
                      <button
                        key={t.symbol}
                        onClick={() => goToMarket(t.symbol)}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/30">
                        <div>
                          <span className="font-medium text-foreground">{base ?? t.symbol}</span>
                          {t.companyName && (
                            <span className="ml-2 text-xs text-muted-foreground">{t.companyName}</span>
                          )}
                        </div>
                        {t.price !== null && (
                          <span className="font-mono text-xs text-muted-foreground">
                            ${Number(t.price).toFixed(2)}
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    No markets found
                  </div>
                )}
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <ProfileMenu name={user.name ?? ""} email={user.email ?? ""} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
