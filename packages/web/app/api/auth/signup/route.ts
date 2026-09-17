// POST /api/auth/signup
// Creates a new user with hashed password, $50,000 starter wallet,
// seed stock allocation (10 shares each of AAPL, MSFT, NVDA),
// and notifies the Matcher Service to pre-load the wallet.

import { prisma }                        from "@stockx/execution-service";
import { NextResponse, type NextRequest }  from "next/server";
import bcrypt                             from "bcrypt";
import { pingApiNewUser }                 from "@/lib/utils/pingApiNewUser";

const SEED_STOCKS = [
  { ticker: "AAPL", qty: 10 },
  { ticker: "MSFT", qty: 10 },
  { ticker: "NVDA", qty: 10 },
] as const;

const STARTER_CASH = 50_000;

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ msg: "All fields are required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ msg: "An account with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Build the assetsHeld JSON that the Matcher uses for in-memory warmup
    const assetsHeld = SEED_STOCKS.reduce<Record<string, number>>(
      (acc, s) => { acc[s.ticker] = s.qty; return acc; },
      {},
    );

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password: hashedPassword },
      });

      // Wallet — cash + assetsHeld snapshot (for Matcher warmup)
      await tx.wallet.create({
        data: {
          userId:     user.id,
          balance:    STARTER_CASH,
          assetsHeld,
        },
      });

      // Holding rows — canonical position records (for P&L, portfolio)
      for (const { ticker, qty } of SEED_STOCKS) {
        await tx.holding.create({
          data: {
            userId:      user.id,
            symbol:      ticker,
            quantity:    qty,
            averageCost: 0,   // seeded at no cost (gift allocation)
            realizedPnl: 0,
          },
        });
      }

      // Audit log
      await tx.transaction.create({
        data: {
          walletId:    user.id,
          type:        "CREDIT",
          category:    "SIGNUP_BONUS",
          description: `Welcome bonus — $${STARTER_CASH.toLocaleString()} simulated capital`,
          amount:      STARTER_CASH,
          balanceAfter: STARTER_CASH,
        },
      });

      for (const { ticker, qty } of SEED_STOCKS) {
        await tx.transaction.create({
          data: {
            walletId:    user.id,
            type:        "CREDIT",
            category:    "SIGNUP_BONUS",
            description: `Seed allocation — ${qty} ${ticker} shares`,
            amount:      0,
            balanceAfter: STARTER_CASH,
            ticker,
            quantity:    qty,
          },
        });
      }

      return user;
    });

    // Pre-load wallet into the Matcher Service in-memory balance map
    pingApiNewUser(newUser.id).catch((err) =>
      console.error("[Signup] Failed to ping Matcher Service:", err),
    );

    return NextResponse.json(
      { msg: "Account created successfully", success: true, id: newUser.id },
      { status: 201 },
    );
  } catch (err) {
    console.error("[Signup] Error:", err);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
