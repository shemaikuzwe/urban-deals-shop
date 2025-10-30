"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  return (
    <div className="flex items-center gap-2">
      <Image
        src={t === "light" ? "/logo2.png" : "/logo.png"}
        alt="logo"
        height={130}
        width={130}
      />
    </div>
  );
}
