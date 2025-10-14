import ProductsGrid from "@/components/products/products-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className=" flex flex-col gap-5">
      <Skeleton className="h-5 w-32" />
      <ProductsGrid />
    </div>
  );
}
