import { ProductCardSkeleton } from "@/components/skeltons/product-card-skeleton";
export default function ProductGridSkelton() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-10">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
