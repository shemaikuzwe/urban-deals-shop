"use client";
import { Button } from "@urban-deals-shop/ui/components/button";
import { CardContent, CardFooter } from "@urban-deals-shop/ui/components/card";
import { Input } from "@urban-deals-shop/ui/components/input";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { signIn } from "@urban-deals-shop/auth/client";
import { useForm } from "@tanstack/react-form";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@urban-deals-shop/ui/components/field";
import { loginSchema } from "@/lib/types/schema";

export function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await signIn.email({
          email: value.email,
          password: value.password,
        });
        if (result.error) {
          toast.error(result.error.message);
        }
        console.log("result", result);
        if (result.data?.user.role !== "admin") {
          toast.error("Invalid email or password");
          return;
        }
        router.replace("/admin");
      });
    },
    validators: {
      onSubmit: loginSchema,
    },
  });
  const router = useRouter();

  return (
    <CardContent>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-6">
          <FieldGroup className="space-y-2">
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      id={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      name={field.name}
                      placeholder="m@example.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldGroup className="space-y-2">
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      id={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                      name={field.name}
                      placeholder="Enter your password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </div>
        <CardFooter className="flex-col gap-2 mt-4 mb-4">
          <Field orientation="responsive">
            <Button type="submit" className="w-25" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </Field>
        </CardFooter>
      </form>
    </CardContent>
  );
}
