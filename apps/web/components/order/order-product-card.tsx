import { Badge } from "@/components/ui/badge";
import { Size } from "@/prisma/generated/prisma/enums";

interface Props {
  product: { name: string; price: number; quantity: number; size: Size };
}
export default function OrdersProductCard({ product }: Props) {
  const currencyFormater = new Intl.NumberFormat("en-rw", {
    style: "currency",
    currency: "RWF",
  });
  return (
    <div className="flex flex-col border p-3 rounded-md">
      <h2 className=" font-semibold">{product.name}</h2>
      <h2>Quantity: {product.quantity}</h2>
      <Badge>{product.size}</Badge>
      <h3>Price: {currencyFormater.format(product.price)}</h3>
    </div>
  );
}
