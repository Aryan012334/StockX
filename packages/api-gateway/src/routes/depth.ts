import { Router }           from "express";
import { ExchangeGateway }  from "../exchangeGateway.js";
import { GET_DEPTH }        from "@stockx/shared";

export const depthRouter = Router();

depthRouter.get("/", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "symbol query param required" });
  }

  try {
    const response = await ExchangeGateway.getInstance().send({
      type: GET_DEPTH,
      data: { symbol },
    });
    return res.status(200).json(response.payload);
  } catch {
    return res.status(500).json({ error: "Matcher Service error" });
  }
});
