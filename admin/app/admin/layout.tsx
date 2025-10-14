import { DashSidebar } from "@/components/admin/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Columns2 } from "lucide-react";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex p-2 w-full min-h-screen ">
        <DashSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
