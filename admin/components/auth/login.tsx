"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/action/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const [state, dispatch, isPending] = useActionState(login, undefined);
  const router = useRouter();
  useEffect(() => {
    if (state && state?.status !== "success") {
      toast.error(state?.message);
    }
    if (state?.status === "success") {
      router.push("/admin");
    }
  }, [state]);
  return (
    <CardContent>
      <form action={dispatch}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
            {state?.errors?.email?.map((error, index) => (
              <p key={index} className="text-red-500 mb-1 text-sm">
                {error}
              </p>
            ))}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
            />
            {state?.errors?.password?.map((error, index) => (
              <p key={index} className="text-red-500 mb-1 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>
        <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-25" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </CardContent>
  );
}
