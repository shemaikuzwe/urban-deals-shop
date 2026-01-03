import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@urban-deals-shop/ui/globals.css";
import React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Urban Deals Shop",
  },
  description: "Urban Deals Shop Ltd ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute={"class"}
          disableTransitionOnChange
          defaultTheme="system"
          enableSystem
        >
          <Toaster />
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
