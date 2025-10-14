import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function UserSkelton() {
  return (
    <div className="w-full flex">
      <Skeleton className={"w-20 h-10 rounded-full"} />
      <div
        className={"flex flex-col gap-2 group-data-[collapsible=icon]:hidden"}
      >
        <Skeleton className={"w-36 h-4"} />
        <Skeleton className={"w-36 h-4"} />
      </div>
    </div>
  );
}
