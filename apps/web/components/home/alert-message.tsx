import { AlertDescription } from "@/components/ui/alert";
import { CheckCheck, TriangleAlert } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { FormStatus } from "@/lib/types/types";

export default function AlertMessage(status: FormStatus) {
  const error = status.status === "error";
  return (
    <Alert
      variant={status.status === "success" ? "default" : "destructive"}
      className={`mt-3 border  ${
        status.status === "success" ? "bg-green-700" : ""
      }`}
    >
      <AlertDescription className={" flex justify-center"}>
        <span
          className={cn(
            "text-md flex items-center gap-1",
            error ? "text-destructive" : "text-background",
          )}
        >
          {status.status === "success" ? (
            <CheckCheck size={20} />
          ) : (
            <TriangleAlert size={15} />
          )}
          {status.message}
        </span>
      </AlertDescription>
    </Alert>
  );
}
