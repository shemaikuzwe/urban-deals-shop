import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChartSkeleton() {
  return (
    <Card className="rounded-sm w-full md:max-w-md lg:max-w-lg">
      <CardHeader className="p-2 bg-muted">
        <CardTitle className="text-md text-center">
          <Skeleton className="h-6 w-40 mx-auto" />
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pl-2 py-3">
        <div className="w-full aspect-[4/3]">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-4 w-20 mx-2" />
          <Skeleton className="h-4 w-20 mx-2" />
        </div>
      </CardContent>
    </Card>
  )
}
