import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getFeaturedProducts, getLatestProducts } from "@/lib/action/action";
import { ProductCard } from "../products/product-card";
import { ArrowRight } from "lucide-react";
import { NoProducts } from "../ui/no-products";

interface Props {
  name: "Featured" | "Latest";
  viewAll?: boolean;
}

export default async function HomeCard({ name, viewAll = true }: Props) {
  const products =
    name == "Featured"
      ? await getFeaturedProducts()
      : await getLatestProducts();
  return (
    <div className="mt-10">
      <center>
        <span className="text-center font-bold text-2xl">{name} Products</span>
      </center>
      <div className={"flex flex-wrap gap-2 mt-10"}>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <NoProducts />
        )}
      </div>

      {viewAll && products.length > 0 && (
        <center>
          <Button variant={"default"} asChild>
            <Link href={"/products"}>
              View All <ArrowRight />{" "}
            </Link>
          </Button>
        </center>
      )}
    </div>
  );
}
