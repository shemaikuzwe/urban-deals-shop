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
import { LogIn } from "lucide-react";
import LoginForm from "../auth/login-form";
import { getSession, signOut } from "@/lib/auth";

export default async function User() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                // src={user.image ?? ""}
                alt={user.name ?? "User avatar"}
              />
              <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.name ?? "User"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  className="w-full"
                  size="sm"
                  variant="ghost"
                  type="submit"
                >
                  Sign out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginForm>
          <Button variant="ghost">
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Button>
        </LoginForm>
      )}
    </div>
  );
}
