"use cache";
import HomeCard from "@/components/home/home-card";
import ImageSlider from "@/components/ui/img-slider";
import { getProducts } from "@/lib/action/server";

export default async function Page() {
  const products = getProducts();
  return (
    <main className="px-14 flex flex-col gap-5">
      <ImageSlider productsPromise={products} />
      <HomeCard name="Featured" viewAll={false} />
      <HomeCard name="Latest" />
    </main>
  );
}
