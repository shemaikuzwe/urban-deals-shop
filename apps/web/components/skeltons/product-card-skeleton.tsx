import {
  Card,
  CardContent
} from "@urban-deals-shop/ui/components/card";
import { Skeleton } from "@urban-deals-shop/ui/components/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden text-muted mx-5 border w-72">
    <CardContent className="p-4 space-y-4">
      <div className="flex justify-end">
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="relative aspect-square">
        <Skeleton className="absolute inset-0" />
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-5 w-20" />
      </div>
    </CardContent>
  </Card>
  );
}
