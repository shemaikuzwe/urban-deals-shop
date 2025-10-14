import { ProductCard } from "./product-card";
import { Product } from "@/generated/prisma/client";
interface Props {
  products?: Product[];
}

export default function ProductsGrid({ products }: Props) {

  return (
    <div  className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.length === 0 ? (
          <p className="text-muted-foreground col-span-full">
            No products available
          </p>
        ) : (
          products?.map((product,index)=> (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
