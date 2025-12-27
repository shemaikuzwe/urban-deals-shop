"use client";
import { useActionState, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CheckCircle2Icon, Delete, FileText, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CartItem } from "./cart-item";
import { addOrder } from "@/lib/action/action";
import { Badge } from "../ui/badge";
import { useCart } from "@/lib/store";
import { Alert, AlertTitle } from "../ui/alert";
import { useSession } from "next-auth/react";
import LoginForm from "../auth/login-form";

export default function Cart() {
  const { cart, removeAll } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [state, action, isPending] = useActionState(addOrder, undefined);
  const { status } = useSession();
  useEffect(() => {
    setTotalPrice(
      cart.reduce(
        (acc: number, curr: { price: number; quantity: number }) =>
          (acc += curr.price * curr.quantity),
        0,
      ),
    );
  }, [cart]);
  const handleRemoveAll = () => {
    removeAll();
  };
  useEffect(() => {
    if (state?.status === "success") handleRemoveAll();
  }, [state?.status]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-20"
          role="button"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {cart.length ? (
            <Badge aria-label={`${cart.length} items in cart`}>
              {cart.length}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent role="complementary" aria-label="Shopping cart items">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review your items before ordering</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {state?.status === "success" && (
            <Alert className="text-green-400">
              <AlertTitle className="flex gap-2">
                <CheckCircle2Icon />
                Success! Your Order has been submitted
              </AlertTitle>
            </Alert>
          )}
          <div className="flex justify-end items-end">
            {cart.length !== 0 && (
              <Delete
                className="text-destructive cursor-pointer"
                onClick={handleRemoveAll}
                role="button"
                aria-label="Remove all items"
              />
            )}
          </div>
          {cart.length ? (
            cart.map((item, index) => <CartItem item={item} key={index} />)
          ) : (
            <div className=" flex flex-col  gap-2 justify-center items-center">
              <FileText className="w-10 h-10" />
              Your cart is empty.
            </div>
          )}
        </div>
        {cart.length !== 0 && (
          <form
            className="flex flex-col justify-start gap-2 items-start"
            action={action}
          >
            <input type="hidden" name="totalPrice" value={totalPrice} />
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <span className="font-bold text-black">
              Total Price :{totalPrice.toLocaleString()} Rwf
            </span>
            {status === "authenticated" ? (
              <Button
                disabled={isPending}
                className="w-full disabled:cursor-not-allowed"
                type="submit"
              >
                {isPending ? "Ordering" : "Procced to Order"}
              </Button>
            ) : (
              <LoginForm>
                <Button className="w-full">Login to order</Button>
              </LoginForm>
            )}
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
