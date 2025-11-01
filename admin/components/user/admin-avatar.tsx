"use client";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "../providers/session-provider";
import { logout } from "@/lib/action/action";
import UserSkelton from "../skeltons/user-skelton";

export default function User() {
  const session = useSession();
  if (session?.status === "pending") return <UserSkelton />;
  if (!session || session.data === null || session.data === undefined)
    return null;
  const user = session.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={"w-full flex cursor-pointer  h-full "}>
          <Avatar>
            <AvatarImage src={""} alt={user.name || "user"} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join()
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className={"flex flex-col group-data-[collapsible=icon]:hidden"}>
            <span className={"text-base"}>{user.name}</span>
            <span className={"text-muted-foreground text-sm"}>
              {user.email}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-56"}>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/admin/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/admin/orders">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"w-full"}>
          <Button size={"sm"} className={"w-full"} onClick={logout}>
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
