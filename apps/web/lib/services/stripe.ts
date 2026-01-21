import { Config, Data, Effect } from "effect";
import Stripe from "stripe";
import { NextRequest } from "next/server";
import { TOrder } from "../types/types";

class StripeError extends Data.TaggedError("StripeError")<{
  message: string;
  cause: unknown;
}> {}

class ParseError extends Data.TaggedError("ParseError")<{
  message: string;
}> {}

const impl = Effect.gen(function* () {
  const STRIPE_SECRET_KEY = yield* Config.string("STRIPE_SECRET_KEY");
  const STRIPE_WEBHOOK_SECRET = yield* Config.string("STRIPE_WEBHOOK_SECRET");
  const BASE_URL = yield* Config.string("NEXT_PUBLIC_BASE_URL");

  const stripe = new Stripe(STRIPE_SECRET_KEY);
  return {
    session: (amount: number, userId: string, cart: string) =>
      Effect.gen(function* () {
        const session = yield* Effect.tryPromise({
          try: () =>
            stripe.checkout.sessions.create({
              line_items: [
                {
                  price_data: {
                    currency: "rwf",
                    unit_amount: amount,
                    product_data: {
                      name: "Order",
                    },
                  },
                  quantity: 1,
                },
              ],
              metadata: {
                buyerId: userId,
                products: cart,
              },
              payment_method_types: [
                "card",
                // "paypal", does not rwf
              ],
              // shipping_address_collection: {
              //    allowed_countries:["RW"]
              // },
              mode: "payment",
              success_url: `${BASE_URL}/orders?success=order created successfully`,
              cancel_url: `${BASE_URL}`,
            }),
          catch: (error) =>
            new StripeError({
              cause: error,
              message: "Failed to create checkout session",
            }),
        });
        return session;
      }),
    callback: (request: NextRequest) =>
      Effect.gen(function* () {
        const body = yield* Effect.tryPromise({
          try: () => request.text(),
          catch: () =>
            new ParseError({ message: "Failed to parse request body" }),
        });
        const sig = request.headers.get("stripe-signature");
        if (!sig)
          return yield* Effect.fail(
            new ParseError({ message: "No signature found" }),
          );

        const event = yield* Effect.try({
          try: () =>
            stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET),
          catch: (error) =>
            new StripeError({
              cause: error,
              message: "Signature verification failed",
            }),
        });
        if (event.type === "checkout.session.completed") {
          const { amount_total, metadata } = event.data.object;
          if (!amount_total || !metadata)
            return yield* Effect.fail(
              new ParseError({ message: "No metadata found" }),
            );
          const order = {
            amount: amount_total,
            userId: metadata.buyerId,
            products: metadata.products,
          } satisfies TOrder;
          return order;
        }
      }),
  };
});
export class StripeService extends Effect.Service<StripeService>()(
  "StripeService",
  {
    effect: impl,
  },
) {}
