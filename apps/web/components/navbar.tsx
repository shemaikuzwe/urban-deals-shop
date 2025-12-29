import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@urban-deals-shop/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@urban-deals-shop/ui/components/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@urban-deals-shop/ui/components/sheet";
import { Home } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import { Suspense } from "react";
import SearchForm from "@urban-deals-shop/ui/components/search";

import Logo from "@urban-deals-shop/ui/components/logo";
import { MenuBadge } from "./menu";

import Cart from "./cart/cart-sheet";
import User from "./user/user";
import ThemeToggle from "./providers/theme-toggle";
import UserSkelton from "./skeltons/user-skelton";

const links = [
  { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
  {
    name: "Products",
    href: "/products",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="hidden md:flex flex-1 justify-center max-w-2xl mx-auto">
            <Suspense fallback={null}>
              <SearchForm />
            </Suspense>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {links.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      <span className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        {link.icon}
                      </span>
                      {link.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4 border-l pl-6 ml-2">
              <Cart />
              <ThemeToggle />
              <Suspense fallback={<UserSkelton />}>
                <User />
              </Suspense>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="h-6 w-6" />
                  <MenuBadge />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col flex-1 gap-6 mt-8">
                  <div className="flex flex-col gap-2">
                    {links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-lg hover:bg-accent"
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex flex-col gap-4 px-4">
                    <Cart />
                    <div className="flex items-center justify-between">
                      <span>Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Suspense fallback={<UserSkelton />}>
                      <User />
                    </Suspense>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
