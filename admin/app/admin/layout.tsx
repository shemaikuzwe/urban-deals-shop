import { DashSidebar } from "@/components/admin/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex gap-2 h-full w-full min-h-screen ">
        <DashSidebar />
        <SidebarTrigger />
        <main className="w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
