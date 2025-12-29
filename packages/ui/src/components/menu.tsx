"use client";

import { useCart } from "@/lib/store";
import { Badge } from "./badge";

export function MenuBadge() {
  const { cart } = useCart();
  return cart.length ? (
    <Badge aria-label={`${cart.length} items in cart`} className=" h-5 w-5">
      {cart.length}
    </Badge>
  ) : null;
}
