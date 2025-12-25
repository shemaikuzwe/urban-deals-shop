"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2" onClick={() => router.push("/")}>
      <Image src={"/logo.png"} alt="logo" height={100} width={100} />
    </div>
  );
}
