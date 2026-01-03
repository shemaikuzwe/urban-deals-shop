import { Card, CardContent, CardFooter, CardHeader } from "@urban-deals-shop/ui/components/card"
import { Skeleton } from "@urban-deals-shop/ui/components/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden  bg-transparent border">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
            <Skeleton className="h-5 w-14" />
          </div>
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardFooter>
    </Card>
  )
}

