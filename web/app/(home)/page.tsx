"use cache";
import HomeCard from "@/components/home/home-card";
import { ProductCardSkeleton } from "@/components/skeltons/product-card-skeleton";
import ImageSlider from "@/components/ui/img-slider";
import { getProducts } from "@/lib/action/server";
import { Suspense } from "react";

export default async function Page() {
  const products = getProducts();
  return (
    <main className="px-14 flex flex-col gap-5">
      <ImageSlider productsPromise={products} />
      <Suspense fallback={<ProductCardSkeleton />}>
        <HomeCard name="Featured" viewAll={false} />
      </Suspense>
      <Suspense fallback={<ProductCardSkeleton />}>
        <HomeCard name="Latest" />
      </Suspense>
    </main>
  );
}
