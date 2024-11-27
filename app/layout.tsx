import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/store/providers";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Ecommerce",
  },
  description: "Ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <ThemeProvider>
            <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
