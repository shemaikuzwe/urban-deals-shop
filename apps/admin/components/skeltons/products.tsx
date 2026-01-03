import { Skeleton } from "@urban-deals-shop/ui/components/skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

export default function ProductSkelton() {
  return (
    <div className="p-4">
      <center>
        <Skeleton className="h-10 w-48" />
      </center>
      <div className=" flex max-md:flex-col max-md:justify-center max-md:items-center">
        <div className="lg:block w-40">
          <div className="py-6">
            <Skeleton className="w-28 h-5" />
            <div className="mt-4 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton className="w-28 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-10">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
}
