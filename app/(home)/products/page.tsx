import { Metadata } from "next";
import Products from "./products";
import Categories from "@/components/products/categories";
import { Suspense } from "react";
import ProductSkelton from "@/components/skeltons/products";
export const metadata: Metadata = {
  title: "Products",
  description: "Products Page",
};

export default async function Page(props: {
  searchParams?: Promise<{
    category?: string[] | string;
    search?: string;
    page?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category;
  const page = searchParams?.page;

  return (
    <ProductSkelton/>
  );
}
