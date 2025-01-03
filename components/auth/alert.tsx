import { AuthStatus } from "@/lib/types";
import { AlertDescription } from "@/components/ui/alert";
import { CheckCheck, TriangleAlert } from "lucide-react";
import { Alert } from "@/components/ui/alert";
export default function AlertMessage(status: AuthStatus) {
  return (
    <Alert
      variant={status.status === "success" ? "default" : "destructive"}
      className={`mt-3 ${status.status === "success" ? "bg-green-600" : ""}`}
    >
      <AlertDescription className={" flex justify-center"}>
        <span className={"text-md flex items-center gap-1 text-inherit"}>
          {status.status === "success" ? (
            <CheckCheck size={15} />
          ) : (
            <TriangleAlert size={15} />
          )}
          {status.message}
        </span>
      </AlertDescription>
    </Alert>
  );
}
