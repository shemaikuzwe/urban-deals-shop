import ProductsGrid from "@/components/admin/products-grid";
import { getProducts } from "@/lib/action/server";

export default async function Page() {
  const products = getProducts();
  return (
    <div className="p-4">
        <ProductsGrid productsPromise={products} />
    </div>
  );
}
