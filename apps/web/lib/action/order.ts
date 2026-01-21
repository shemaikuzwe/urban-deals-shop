import { Effect } from "effect";
import { StripeService } from "../services/stripe";
import { NextRequest } from "next/server";

export const checkoutOrder = (amount: number, userId: string, cart: string) =>
  Effect.gen(function* () {
    const stripeService = yield* StripeService;
    const session = yield* stripeService.session(amount, userId, cart);
    return session;
  }).pipe(
    Effect.provide(StripeService.Default),
    Effect.catchAll((error) => {
      Effect.tap(() => Effect.logError(error));
      return Effect.succeed(null);
    }),
    Effect.runPromise,
  );

export const checkoutOrderCallback = (request: NextRequest) =>
  Effect.gen(function* () {
    const stripeService = yield* StripeService;
    const order = yield* stripeService.callback(request);
    return order;
  }).pipe(
    Effect.provide(StripeService.Default),
    Effect.catchAll((error) => {
      Effect.tap(() => Effect.logError(error));
      return Effect.succeed(null);
    }),
    Effect.runPromise,
  );
