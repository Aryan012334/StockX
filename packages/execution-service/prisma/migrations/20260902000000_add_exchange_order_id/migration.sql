-- Migration: add exchangeOrderId to Order table
--
-- CortexCookie concept: the trading app stores both its own internal order ID
-- and the ID the exchange assigns to the order. This lets the app reconcile
-- its Order DB with the exchange's state.
--
-- exchangeOrderId is nullable because it is populated only after the Matcher
-- Service accepts the order. The column is set in a subsequent UPDATE after
-- the initial INSERT (which uses the client-generated id).

ALTER TABLE "Order" ADD COLUMN "exchangeOrderId" TEXT;
