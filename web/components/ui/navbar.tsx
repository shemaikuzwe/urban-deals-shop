import Link from "next/link";
import { Menu, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Cart from "../cart/cart-sheet";
import { Suspense } from "react";
import SearchForm from "./search";
import ThemeToggle from "../providers/theme-toggle";
import Logo from "./logo";
import { MenuTrigger } from "./menu";

const links = [
  { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
  {
    name: "Products",
    href: "/products",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <PhoneIcon className="h-5 w-5" />,
  },
];

export function Navbar() {
  return (
    <nav className="bg-card border-b h-20 py-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <Suspense fallback={null}>
            <SearchForm />
          </Suspense>
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link
                      href={link.href}
                      className="px-3 flex gap-1 py-2 rounded-md text-sm font-medium"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Cart />
            <ThemeToggle />
            {/*<Suspense fallback={<UserSkelton />}>
            <User />
          </Suspense>*/}
          </div>
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger>
                <MenuTrigger />
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col justify-start items-start gap-2 mt-4">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-3 flex gap-1 py-2 rounded-md text-sm font-medium"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                  <Cart />
                  <ThemeToggle />
                  {/*<Suspense fallback={<UserSkelton />}>
                  <User />
                </Suspense>*/}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
