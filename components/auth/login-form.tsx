"use client";
import { useFormStatus } from "react-dom";
import InputGroup from "./inputGroup";
import { authenticate } from "@/lib/action/action";
import { useActionState } from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
export default function LoginForm() {
  const [state, dispatch, isPending] = useActionState(authenticate, undefined);
  return (
    <div className={"p-6 border rounded-md w-full"}>
      <form action={dispatch}>
        <h2 className={"text-xl text-center mb-4 font-medium"}>
          Enter Your credentials
        </h2>
        <InputGroup
          type={"text"}
          label={"email"}
          placeholder={"Enter your email"}
        />

        <InputGroup
          type={"password"}
          label={"password"}
          placeholder={"Enter your password"}
        />
        {state && <label className=" text-red-500"> {state.message}</label>}
        <center>
          <Button
            disabled={isPending}
            className="flex mt-5 gap-2 px-5 
     disabled:cursor-not-allowed"
          >
            <ArrowsRightLeftIcon width={20} height={20} /> Login
          </Button>
        </center>

        <center className={"mt-4"}>--OR--</center>
      </form>
    </div>
  );
}
