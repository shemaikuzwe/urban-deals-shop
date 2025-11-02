"use client";

import { Menu } from "lucide-react";
import { Button } from "./button";
import { useCart } from "@/lib/store";
import { Badge } from "./badge";

export function MenuTrigger() {
  const { cart } = useCart();
  return (
    <Button variant="ghost" className="ml-2">
      <Menu className="h-6 w-6" />
      {cart.length ? (
        <Badge aria-label={`${cart.length} items in cart`} className=" h-5 w-5">
          {cart.length}
        </Badge>
      ) : null}
      <span className="sr-only">Open menu</span>
    </Button>
  );
}
