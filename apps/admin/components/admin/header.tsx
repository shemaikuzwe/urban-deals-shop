"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@urban-deals-shop/ui/components/button";
import { SidebarTrigger } from "@urban-deals-shop/ui/components/sidebar";
import { useRouter } from "next/navigation";
import ThemeToggle from "../providers/theme-toggle";
import User from "../user/admin-avatar";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Button size="icon" variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2 h-full">
          <ThemeToggle />
          <User />
        </div>
      </div>
    </header>
  );
}
