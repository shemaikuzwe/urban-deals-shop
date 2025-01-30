import { ProdCard } from "@/components/products/prod-card";
import RelatedProduct from "@/components/products/related-product";
import ProductGridSkelton from "@/components/skeltons/product-grid";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getProduct } from "@/lib/action/server";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

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
      <Separator className="mt-4" />
      <Suspense
        fallback={
          <>
            <Skeleton className="w-56 h-5" /> <ProductGridSkelton />
          </>
        }
      >
        <RelatedProduct type={product.type} id={product.id} />
      </Suspense>
    </div>
  );
}
