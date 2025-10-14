import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

export function NoProducts() {
  return (
    <Empty className="mt-10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCartIcon />
        </EmptyMedia>
        <EmptyTitle>No Products Found</EmptyTitle>
        {/*<EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>*/}
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" asChild>
          <Link href="/products/new">Create Product</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
