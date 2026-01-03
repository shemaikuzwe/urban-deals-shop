"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@urban-deals-shop/ui/components/dialog";
import { LoginCard } from "./login-card";

export default function LoginForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl w-full p-0">
        <LoginCard setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
