"use client";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@urban-deals-shop/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@urban-deals-shop/ui/components/dropdown-menu";
import Link from "next/link";
import { Button } from "@urban-deals-shop/ui/components/button";
import UserSkelton from "../skeltons/user-skelton";
import { signOut, useSession } from "@urban-deals-shop/auth/client";
import { useRouter } from "next/navigation";

export default function User() {
  const router = useRouter();
  const session = useSession();
  if (session?.isPending) return <UserSkelton />;
  if (!session || session.data === null || session.data === undefined)
    return null;
  const user = session.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={"w-full flex cursor-pointer  h-full "}>
          <Avatar>
            <AvatarImage src={""} alt={user.user.name || "user"} />
            <AvatarFallback>
              {user.user.name
                .split(" ")
                .map((n) => n[0])
                .join()
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className={"flex flex-col group-data-[collapsible=icon]:hidden"}>
            <span className={"text-base"}>{user.user.name}</span>
            <span className={"text-muted-foreground text-sm"}>
              {user.user.email}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-56"}>
        <DropdownMenuLabel>{user.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/admin/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"w-full"}>
          <Button
            size={"sm"}
            className={"w-full"}
            onClick={async () => {
              const res = await signOut();
              if (res.data?.success) {
                router.replace("/");
              }
            }}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
