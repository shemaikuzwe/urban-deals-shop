import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@urban-deals-shop/ui/components/sidebar";
import { links } from "@/lib/types/data";
import { logout } from "@/lib/action/action";
import { LogOutIcon } from "lucide-react";
import Logo from "./logo";
export function DashSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2 border-b-border">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {links.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon width={30} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-2 w-full border-t-border  mt-auto border-none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOutIcon /> LogOut
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
