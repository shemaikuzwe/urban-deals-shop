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
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function Cart() {
  const { cart, removeAll } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [state, action, isPending] = useActionState(addOrder, undefined);
  useEffect(() => {
    setTotalPrice(
      cart.reduce(
        (acc: number, curr: { price: number; quantity: number }) =>
          (acc += curr.price * curr.quantity),
        0,
      ),
    );
  }, [cart]);
  useEffect(() => {
    if (state?.status == "success") handleRemoveAll();
  }, [state?.status]);
  const handleRemoveAll = () => {
    removeAll();
  };
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
            {cart.length != 0 && (
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
        {cart.length != 0 && (
          <form
            className="flex flex-col justify-start gap-2 items-start"
            action={action}
          >
            <input type="hidden" name="totalPrice" value={totalPrice} />
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <span className="font-bold text-black">
              Total Price :{totalPrice.toLocaleString()} Rwf
            </span>
            <div className="flex flex-col gap-2 w-full">
              <Input
                type="text"
                name="name"
                placeholder="Enter your full names"
                required
                min={3}
              />
              {state?.errors?.name &&
                state.errors.name.map((error) => (
                  <p key={error} className="text-red-500 text-sm">
                    {error}
                  </p>
                ))}
              <div className="flex  gap-2">
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  required
                  min={10}
                />
                {state?.errors?.phoneNumber &&
                  state.errors.phoneNumber.map((error) => (
                    <p key={error} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}

                <Input
                  type="text"
                  name="address"
                  placeholder="Enter your location"
                  required
                  min={3}
                />
                {state?.errors?.address &&
                  state.errors.address.map((error) => (
                    <p key={error} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <Button
              disabled={isPending}
              className="w-full disabled:cursor-not-allowed"
              type="submit"
            >
              {isPending ? "Ordering" : "Procced TO Order"}
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
