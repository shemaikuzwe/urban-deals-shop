"use client";
import { signOut } from "@urban-deals-shop/auth/client";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@urban-deals-shop/ui/components/sidebar";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={async () => {
          const res = await signOut();
          if (res.data?.success) {
            router.replace("/");
          }
        }}
      >
        <LogOutIcon /> LogOut
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
