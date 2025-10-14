import { getRelatedProducts } from "@/lib/action/server";
import { Category } from "@/generated/prisma/client";
import React from "react";
import ProductsGrids from "@/components/products/products-grid";
interface Props {
  type: Category;
  id: string;
}

export default async function RelatedProduct({ type, id }: Props) {
  const products = await getRelatedProducts(type, id);
  return (
    <div className=" flex flex-col gap-3 justify-center items-center mt-4">
      <h1 className="text-xl font-bold">Related Products</h1>
      <div className={"flex flex-wrap  gap-2 "}>
        {products && products.length > 0 ? (
          <ProductsGrids products={products} />
        ) : (
          <center className=" text-xl text-center mt-24">
            No products found
          </center>
        )}
      </div>
    </div>
  );
}
