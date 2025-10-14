import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { Product } from "@/generated/prisma/client";
import Link from "next/link";
import { use } from "react";
import { NoProducts } from "../ui/no-products";

export default async function ProductsGrid({
  productsPromise,
}: {
  productsPromise: Promise<Product[]>;
}) {
  const products = await productsPromise;
  return (
    <div className="space-y-4 flex flex-col justify-center items-center">
      {products.length === 0 && <NoProducts />}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length > 0 && (
        <Button className="w-full sm:w-auto" size="lg" asChild>
          <Link href={"/admin/products/new"}>Add new Product</Link>
        </Button>
      )}
    </div>
  );
}
