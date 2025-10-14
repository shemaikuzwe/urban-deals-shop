"use client"
import { TriangleAlert } from "lucide-react";
import {Button} from "@/components/ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset(): void;
}) {
  return (
    <div className="flex-col  mx-auto justify-center items-center  m-14 w-[50vh]">
      <div className="flex mx-auto justify-center mt-40">
        <TriangleAlert/>
      </div>
      <center>
        <span className=" text-center  text-xl font-medium ">
          Something went wrong
        </span>
      </center>
      <center>
        <Button
          onClick={() => reset()}
          type="button"
          asChild
        >
            <TriangleAlert width={20} height={20} className=" text-white" />
           <span className={" font-semibold"}>Retry</span>
        </Button>
      </center>
    </div>
  );
}
