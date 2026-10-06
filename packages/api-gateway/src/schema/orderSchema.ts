import { z } from "zod";

export const createOrderSchema = z.object({
  userId:    z.string().min(1),
  symbol:    z.string().min(3).regex(/^[A-Z]+_[A-Z]+$/, "Symbol must be BASE_QUOTE format e.g. RIL_INR"),
  price:     z.string().regex(/^\d+(\.\d+)?$/, "Price must be a positive number"),
  quantity:  z.string().regex(/^\d+(\.\d+)?$/, "Quantity must be a positive number"),
  side:      z.enum(["buy", "sell"]),
  orderType: z.enum(["limit", "market"]),
});

export const cancelOrderSchema = z.object({
  orderId: z.string().min(1),
  symbol:  z.string().min(1),
});

export const getOpenOrdersSchema = z.object({
  userId: z.string().min(1),
  symbol: z.string().min(1),
});
