"use client";
import {
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Truck,
  Loader2,
  Github,
  Mail,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useTransition } from "react";
import Logo from "../ui/logo";
import { Input } from "../ui/input";
import { signIn } from "@/lib/auth/auth-client";
import { logIn } from "@/lib/action/action";

export function LoginCard({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = async (provider: "google" | "github") => {
    // startTransition(async () => {
    await logIn();
    // });
  };
  return (
    <Card className="overflow-hidden border-none  w-full bg-card shadow-2xl">
      <CardContent className="p-0 flex flex-col md:flex-row min-h-[580px]">
        <div className="flex-1 p-8 flex flex-col relative">
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="absolute left-6 top-6 rounded-full bg-muted/50 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="mt-12 flex flex-col items-center text-center space-y-6 max-w-sm mx-auto w-full">
            <div className="flex items-center gap-2 mb-2">
              <Logo />
            </div>

            <p className="text-muted-foreground text-sm">
              Sign in or create your account
            </p>
            <Button
              className="w-full h-12 text-base justify-center"
              type="submit"
              variant={"outline"}
              disabled={isPending}
              onClick={() => handleSignIn("google")}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
            {/* <div className="w-full space-y-2"> */}
            <Button
              className="w-full h-12  flex gap-2 items-center justify-center mb-2"
              onClick={() => handleSignIn("github")}
              variant={"outline"}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Github />
                  Continue with GitHub
                </>
              )}
            </Button>
            {/* </div> */}
            <div className="w-full flex items-center gap-4 py-1">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground uppercase">
                Or
              </span>
              <Separator className="flex-1" />
            </div>
            <div className="w-full space-y-2">
              <Input placeholder="Enter your Email" />
              <Button variant="secondary">
                <Mail className="mr-2 h-4 w-4 " />
                Continue with Email
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              By clicking continue, you agree to our{" "}
              <a
                href=""
                className="underline hover:text-foreground underline-offset-2"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline hover:text-foreground underline-offset-2"
              >
                Policy
              </a>
            </p>
          </div>
        </div>

        {/* Right Pane */}
        <div className="flex-1 bg-secondary/30 p-12 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight">
                Urban Deals Shop
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Discover the best products, delivered straight to your home.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-background shadow-sm">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your favorite items delivered quickly with our efficient
                    shipping network.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-background shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Shop with confidence knowing your transactions are
                    protected.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-background shadow-sm">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Quality Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    We ensure all our products meet high-quality standards for
                    your satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
