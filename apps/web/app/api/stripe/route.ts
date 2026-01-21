import { checkoutOrderCallback } from "@/lib/action/order";
import { addOrder } from "@/lib/action/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const order = await checkoutOrderCallback(req);
  if (!order) return NextResponse.json({ received: false }, { status: 200 });
  await addOrder(order);

  return NextResponse.json({ received: true }, { status: 200 });
}
