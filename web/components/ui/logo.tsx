"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  return (
    <div className="flex items-center gap-2" onClick={() => router.push("/")}>
      <Image
        src={t === "light" ? "/logo1.png" : "/logo-dark.png"}
        alt="logo"
        height={100}
        width={100}
      />
    </div>
  );
}
