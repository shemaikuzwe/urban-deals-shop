import { create } from "zustand";
import { Actions, Cart } from "@/lib/types/types";
import { persist } from "zustand/middleware";

export const useCart = create<Cart & Actions>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      incrementQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),
      decrementQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(0, item.quantity - 1),
                }
              : item
          ),
        })),
      removeAll: () =>
        set({
          cart: [],
        }),
    }),
    { name: "cart" }
  )
);
