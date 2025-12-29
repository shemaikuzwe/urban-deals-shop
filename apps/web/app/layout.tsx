import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Urban Deals Shop",
  },
  description: "Urban Deals Shop – Where Creativity Meets Quality",
  keywords: ["fashion", "rwanda", "Urban Deals Shop", "clothes"],
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${inter.className} font-sans antialiased`}>
        <ThemeProvider
          attribute={"class"}
          disableTransitionOnChange
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
