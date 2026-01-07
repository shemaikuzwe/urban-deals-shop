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
import Logo from "./logo";
import LogOut from "./logout";
export function DashSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      // className="w-64"
    >
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
          <LogOut />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
