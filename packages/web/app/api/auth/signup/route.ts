// POST /api/auth/signup
// Creates a new user with hashed password, starter wallet (₹50,000 + seed
// stock allocation), and notifies the Matcher Service to pre-load the wallet.

import { prisma }                       from "@stockx/execution-service";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt                            from "bcrypt";
import { pingApiNewUser }                from "@/lib/utils/pingApiNewUser";

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

    // Create user + wallet + starter transactions in one atomic transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password: hashedPassword },
      });

      // Starter wallet: ₹50,000 cash + seed stock allocation
      await tx.wallet.create({
        data: {
          userId:     user.id,
          balance:    50000,
          assetsHeld: { RIL: 50, TATA: 50, SOL: 50 },
        },
      });

      // Audit records
      await tx.transaction.create({
        data: {
          walletId:    user.id,
          type:        "CREDIT",
          category:    "SIGNUP_BONUS",
          description: "Welcome bonus — ₹50,000 simulated capital",
          amount:      50000,
          balanceAfter: 50000,
        },
      });

      for (const [ticker, qty] of [["RIL", 50], ["TATA", 50], ["SOL", 50]] as const) {
        await tx.transaction.create({
          data: {
            walletId:    user.id,
            type:        "CREDIT",
            category:    "SIGNUP_BONUS",
            description: `Seed allocation — ${qty} ${ticker} shares`,
            amount:      0,
            balanceAfter: 50000,
            ticker,
            quantity:    qty,
          },
        });
      }

      return user;
    });

    // Pre-load wallet into the Matcher Service in-memory balance map
    // (non-blocking — failure is acceptable, will load on next restart)
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
