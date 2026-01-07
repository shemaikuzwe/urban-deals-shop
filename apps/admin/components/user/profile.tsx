"use client";
import { useState, useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Package, Lock } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@urban-deals-shop/ui/components/avatar";
import { Button } from "@urban-deals-shop/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@urban-deals-shop/ui/components/card";
import { Input } from "@urban-deals-shop/ui/components/input";
import { Label } from "@urban-deals-shop/ui/components/label";
import { updateProfile } from "@/lib/action/action";
import { Alert, AlertTitle } from "@urban-deals-shop/ui/components/alert";
import ThemeSelector from "../providers/theme-selector";
import { cn } from "@urban-deals-shop/ui/lib/utils";
import { useSession } from "@urban-deals-shop/auth/client";

export default function Profile() {
  const [state, action1, pending] = useActionState(updateProfile, undefined);

  const [isEditing, setIsEditing] = useState(false);
  const { data, isPending } = useSession();
  if (isPending) return null;
  useEffect(() => {
    if (state?.status == "success") {
      setIsEditing(false);
    }
  }, [state?.status]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto rounded-md">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={""} alt={data?.user?.name} />
              <AvatarFallback>
                {data?.user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{data?.user?.name!}</CardTitle>
              <CardDescription>{data?.user?.email!}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-4" action={action1}>
              <div className="flex items-center space-x-4">
                <User className="text-muted-foreground" />
                <div className="flex-grow">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    defaultValue={data?.user?.name}
                    readOnly={!isEditing}
                  />
                  {state?.errors?.fullName &&
                    state.errors.fullName.map((error) => (
                      <span
                        aria-live="polite"
                        className="mt-2 text-destructive"
                        key={error}
                      >
                        {error}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-muted-foreground" />
                <div className="flex-grow">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={data?.user?.email}
                    readOnly={!isEditing}
                  />
                  {state?.errors?.email &&
                    state.errors.email.map((error) => (
                      <span
                        aria-live="polite"
                        className="mt-2 text-destructive"
                        key={error}
                      >
                        {error}
                      </span>
                    ))}
                </div>
              </div>
              {state?.message && (
                <Alert
                  className={cn({
                    "text-green-400": state.status === "success",
                    "text-destructive": state.status === "error",
                  })}
                >
                  <AlertTitle>{state.message}</AlertTitle>
                </Alert>
              )}
              <div className="flex justify-between pt-4">
                {isEditing ? (
                  <>
                    <Button type="submit">Save Changes</Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </CardContent>
        <CardFooter>
          <ThemeSelector />
        </CardFooter>
      </Card>
    </div>
  );
}
