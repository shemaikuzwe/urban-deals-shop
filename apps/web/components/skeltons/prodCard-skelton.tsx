import React from "react";
import { Card, CardContent } from "@urban-deals-shop/ui/components/card";
import { Skeleton } from "@urban-deals-shop/ui/components/skeleton";
import ProductGridSkelton from "./product-grid";

export default function ProdCardSkelton() {
  return (
    <div className="flex flex-col gap-2 p-4 justify-center items-center h-fit">
      <Card className="p-4">
        <CardContent className="flex max-md:flex-col justify-between  gap-4">
          <div className="w-96 h-96 relative">
            <Skeleton className="w-96 h-96 relative" />
          </div>
          <div className=" flex  justify-center items-center flex-col gap-4">
            <div>
              <div className=" space-y-2">
                <Skeleton className=" w-28 h-5" />
                <Skeleton className="w-28 h-5" />
                <Skeleton className=" rounded-full w-28 h-5" />
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="w-16 h-8" />
                  <Skeleton className="w-16 h-8" />
                  <Skeleton className="w-16 h-8" />
                  <Skeleton className="w-16 h-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-16 h-8" />
                  <Skeleton className="w-9 h-4" />
                  <Skeleton className="w-16 h-8" />
                </div>
                <div>
                  <Skeleton className="w-16 h-8" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Skeleton className="w-56 h-5" />
       <ProductGridSkelton />
    </div>
  );
}
