import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@urban-deals-shop/ui/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@urban-deals-shop/ui/components/dropdown-menu";

import { updateStatus } from "@/lib/action/action";

interface Props {
  id: string;
  status: Status;
}
export default function StatusChange({ id, status }: Props) {
  const handleUpdateStatus = async (s: Status) => {
    await updateStatus(id, s);
  };
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" /> Failed
          </Badge>
        );
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{getStatusBadge(status)}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {[Status.COMPLETED, Status.PENDING, Status.FAILED].map((s, index) => (
          <DropdownMenuItem
            key={index}
            disabled={s === status}
            onClick={() => handleUpdateStatus(s)}
          >
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
