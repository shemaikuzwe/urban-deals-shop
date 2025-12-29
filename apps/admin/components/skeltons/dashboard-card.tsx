import { Card, CardContent, CardHeader } from "@urban-deals-shop/ui/components/card";
import { Separator } from "@urban-deals-shop/ui/components/separator";
import { Skeleton } from "@urban-deals-shop/ui/components/skeleton";

function DashboardCardSkeleton() {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 bg-muted/40">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <Separator />
      <CardContent className="p-8">
        <Skeleton className="h-8 w-24 mx-auto mb-4" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </CardContent>
    </Card>
  );
}

export default function DashboardCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 max-md:grid-cols-2 lg:grid-cols-4">
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
    </div>
  );
}