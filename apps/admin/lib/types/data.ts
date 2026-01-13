import { Size } from "@urban-deals-shop/db";
import { LayoutDashboard, ShoppingCart, Package } from "lucide-react";
export const categories = [
  "T_SHIRT",
  "SHIRTS",
  "SUITS",
  "PANTS",
  "SHORTS",
  "SHOES",
  "OTHER",
] as const;
export const size: Size[] = ["S", "XS", "M", "XL", "L"];

export const links = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    name: "Products",
    icon: ShoppingCart,
    href: "/admin/products",
  },
  {
    name: "Orders",
    icon: Package,
    href: "/admin/orders",
  },
  // {
  //   name: "Users",
  //   icon: Users,
  //   href: "/admin/products",
  // },
] as const;
