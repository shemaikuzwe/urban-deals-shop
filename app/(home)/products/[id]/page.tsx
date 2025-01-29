import { ProdCard } from "@/components/products/prod-card";
import { getProduct } from "@/lib/action/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    notFound();
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <ProdCard product={product} />
    </div>
  );
}
