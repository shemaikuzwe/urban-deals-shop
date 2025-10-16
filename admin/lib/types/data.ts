import { Category, Size } from "@prisma/client";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Columns2,
} from "lucide-react";
export const categories: Category[] = [
  "T_SHIRT",
  "SHIRTS",
  "SUITS",
  "PANTS",
  "SHORTS",
  "SHOES",
  "OTHER",
];
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
