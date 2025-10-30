import Header from "@/components/admin/header";
import { DashSidebar } from "@/components/admin/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex gap-2 h-full w-full min-h-screen ">
        <DashSidebar />
        <main className="w-full flex flex-col h-full">
          <Header />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
