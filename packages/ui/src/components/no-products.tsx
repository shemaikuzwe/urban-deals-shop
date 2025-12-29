import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCartIcon } from "lucide-react";

export function NoProducts() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCartIcon />
        </EmptyMedia>
        <EmptyTitle>No Products Found</EmptyTitle>
        {/*<EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>*/}
      </EmptyHeader>
      {/*<EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>*/}
    </Empty>
  );
}
