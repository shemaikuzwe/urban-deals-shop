"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Product, Size } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };
  return (
    <div className="w-72 max-w-sm p-0 " onClick={handleClick}>
      <div>
        <div className="relative aspect-square cursor-pointer border-2 rounded-lg">
          <Image
            src={`${product.image}`}
            alt={product.name}
            sizes="100vw"
            fill
            className="object-cover rounded-lg"
          />
          <Badge className="absolute top-2 right-2 bg-background/80  text-foreground">
            {product.price.toLocaleString()} Rwf
          </Badge>
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm max-w-fit max-md:text-md absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            {product.name}
          </Badge>
        </div>
      </div>
    </div>
  );
}
