import HomeCard from "@/components/home/home-card";
import { Hero } from "@/components/home/hero";
import { ProductCardSkeleton } from "@/components/skeltons/product-card-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/action/server";

export default function Page() {
  const product = getProducts();
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero productPromise={product} />
      <div className="space-y-12 pb-20">
        <Suspense fallback={<ProductCardSkeleton />}>
          <HomeCard name="Featured" viewAll={false} />
        </Suspense>
        <Suspense fallback={<ProductCardSkeleton />}>
          <HomeCard name="Latest" />
        </Suspense>
      </div>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Home",
};
