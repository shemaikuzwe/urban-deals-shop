import Logo from "@/components/admin/logo";
import { LoginPage } from "@/components/auth/login";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Urban Deals Shop ",
};
export default function LoginForm() {
  return (
    <div className="flex min-h-screen justify-center  p-4">
      <Card className="w-full max-w-md h-120 sm:mt-20 mt-14 ">
        <CardHeader className="space-y-1">
          <div className="flex justify-center items-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginPage />
        </CardContent>
      </Card>
    </div>
  );
}
