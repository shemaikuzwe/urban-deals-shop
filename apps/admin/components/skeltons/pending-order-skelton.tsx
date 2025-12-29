import React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function PendingDepositsSkeleton() {
  return (
    <Card className="rounded-sm">
      <CardHeader className="bg-muted/50 p-2">
        <Skeleton className="h-6 w-40 mx-auto" />
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
      <Separator className="my-2" />
      <CardFooter className="flex justify-center p-2">
        <Button variant="outline" className="w-full" disabled>
          <Skeleton className="h-4 w-48" />
          <MoveRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}