import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@urban-deals-shop/ui/globals.css";
import React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], weight: ["400", "600"] });

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
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute={"class"}
          disableTransitionOnChange
          defaultTheme="system"
          enableSystem
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
