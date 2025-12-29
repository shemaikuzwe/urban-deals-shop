import { ReactNode } from "react";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen ">
      <Navbar />
      <main className={"bg-muted/50 mb-2"}>{children}</main>
      <Footer />
    </div>
  );
}
