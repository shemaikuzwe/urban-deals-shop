"use client";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src={"/logo.png"} alt="logo" height={130} width={130} />
    </div>
  );
}
