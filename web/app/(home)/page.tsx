import HomeCard from "@/components/home/home-card";
import { ProductCardSkeleton } from "@/components/skeltons/product-card-skeleton";
import ImageSlider from "@/components/ui/img-slider";
import { getProducts } from "@/lib/action/server";
import { Metadata } from "next";
import { Suspense } from "react";

export default function Page() {
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
export const metadata: Metadata = {
  title: "Home",
  description:
    "At Urban Deals Shop, we design, sew, and sell high-quality clothes made with passion and precision. Whether you want modern fashion, traditional wear, or custom-made designs.",
};
