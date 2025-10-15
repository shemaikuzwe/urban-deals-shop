"use client";
import { useState, useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Package, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/action/action";
import { Alert, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";
import ThemeSelector from "../providers/theme-selector";
import { useSession } from "../providers/session-provider";

// interface UserProfileProps {
//   orders: Promise<number>;
// }

export default function Profile() {
  const [state, action1, pending] = useActionState(updateProfile, undefined);
  // const [status, action2, isPending] = useActionState(
  //   changePassword,
  //   undefined
  // );
  const [isEditing, setIsEditing] = useState(false);
  const session = useSession();
  const user = session?.data;
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
              <AvatarImage src={user?.image!} alt={user?.name!} />
              <AvatarFallback>
                {user?.name!.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user?.name!}</CardTitle>
              <CardDescription>{user?.email!}</CardDescription>
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
                    defaultValue={user?.name!}
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
                    defaultValue={user?.email!}
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

                {/* <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Lock />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Enter your current password and a new password to change
                        it.
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" action={action2}>
                      <div>
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          placeholder="Enter current password"
                        />
                        {status?.errors?.currentPassword &&
                          status.errors.currentPassword.map((error) => (
                            <span
                              aria-live="polite"
                              className="mt-2 text-destructive"
                               key={error}
                             >
                              {error}
                            </span>
                          ))}
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                        {status?.errors?.newPassword &&
                          status.errors.newPassword.map((error) => (
                            <span
                              aria-live="polite"
                              className="mt-2 text-destructive"
                             key={error}
                           >
                              {error}
                            </span>
                          ))}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          aria-label="confirmPassword-error"
                          placeholder="confirm password"
                        />
                        {status?.errors?.confirmPassword &&
                          status.errors.confirmPassword.map((error) => (
                            <span
                              aria-live="polite"
                              className="mt-2 text-destructive"
                              key={error}
                            >
                              {error}
                            </span>
                          ))}
                      </div>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? "Updating..." : "Update Password"}
                      </Button>
                      {status?.message && (
                        <Alert
                          className={cn({
                            "text-green-400": status.status === "success",
                            "text-destructive": status.status === "error",
                          })}
                        >
                          <AlertTitle>{status.message}</AlertTitle>
                        </Alert>
                      )}
                    </form>
                  </DialogContent>
                </Dialog> */}
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
