import { addOrder } from "@/lib/action/server";
import { TOrder } from "@/lib/types/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endPointSecret);
  } catch (err) {
    NextResponse.json("Invalid webhook", { status: 500 });
  }

  if (event?.type === "checkout.session.completed") {
    console.log("Checkout session completed");
    const { amount_total, metadata } = event.data.object;
    // const city=shipping_details?.address?.city;
    // const name=shipping_details?.name;
    // const code=shipping_details?.address?.postal_code
    if (!metadata) {
      console.log("No metadata found");
      return NextResponse.json({ received: false }, { status: 200 });
    }
    const order = {
      userId: metadata?.buyerId,
      amount: amount_total!,
      products: metadata?.products,
    } satisfies TOrder;
    await addOrder(order);
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
