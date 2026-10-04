// POST /api/v1/user/init
// Called after sign-up to load the user's wallet into the Matcher Service's
// in-memory balance map so they can immediately place orders.

import { Router }           from "express";
import { ExchangeGateway }  from "../exchangeGateway.js";
import { ADD_USER }         from "@stockx/shared";
import { prisma }           from "@stockx/execution-service";

export const newUserRouter = Router();

newUserRouter.post("/", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    const response = await ExchangeGateway.getInstance().send({
      type: ADD_USER,
      data: { userId, wallet },
    });
    return res.status(201).json(response.payload);
  } catch (err) {
    console.error("[NewUser] Engine init error:", err);
    return res.status(500).json({ error: "Failed to initialise user in Matcher Service" });
  }
});
