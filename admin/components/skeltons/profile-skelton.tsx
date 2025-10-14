import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, User, Package } from 'lucide-react'

export default function ProfileSkeleton() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Package className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

