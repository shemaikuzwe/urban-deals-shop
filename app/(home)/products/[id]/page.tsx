import { ProdCard } from "@/components/products/prod-card";
import RelatedProduct from "@/components/products/related-product";
import { Separator } from "@/components/ui/separator";
import { getProduct } from "@/lib/action/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string | undefined }>;
}) {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-2 p-4 justify-center items-center h-fit">
      <ProdCard product={product} />
      <Separator className="mt-4"/>
      <RelatedProduct type={product.type} id={product.id} />
    </div>
  );
}
