"use server";

import { prisma } from "@stockx/execution-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type Wallet = {
  balance:       string;
  lockedBalance: string;
  availableCash: string;
  holdings:      Record<string, number>;
};

export async function getWallet(): Promise<Wallet | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const wallet = await prisma.wallet.findUnique({
    where: { userId: session.user.id },
  });

  if (!wallet) return null;

  const balance       = Number(wallet.balance);
  const lockedBalance = Number(wallet.lockedBalance);

  return {
    balance:       balance.toFixed(2),
    lockedBalance: lockedBalance.toFixed(2),
    availableCash: Math.max(0, balance - lockedBalance).toFixed(2),
    holdings:      (wallet.assetsHeld ?? {}) as Record<string, number>,
  };
}
