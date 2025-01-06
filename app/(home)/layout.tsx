import { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/home/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen ">
      <Navbar />

      <main className={"bg-muted/50 mb-2"}>{children}</main>
      <Footer />
    </div>
  );
}
