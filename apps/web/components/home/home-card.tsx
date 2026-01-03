import { Button } from "@urban-deals-shop/ui/components/button";
import Link from "next/link";
import { getFeaturedProducts, getLatestProducts } from "@/lib/action/action";
import { ProductCard } from "../products/product-card";
import { ArrowRight } from "lucide-react";
import { NoProducts } from "@urban-deals-shop/ui/components/no-products";

interface Props {
  name: "Featured" | "Latest";
  viewAll?: boolean;
}

export default async function HomeCard({ name, viewAll = true }: Props) {
  const products =
    name === "Featured"
      ? await getFeaturedProducts()
      : await getLatestProducts();

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center tracking-tight">
          {name} <span className="text-primary">Products</span>
        </h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <NoProducts />
        )}
      </div>

      {viewAll && products.length > 0 && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            asChild
          >
            <Link href="/products" className="flex items-center gap-2">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
