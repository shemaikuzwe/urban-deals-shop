"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Product, Size } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Item } from "@/lib/types/types";
import { useCart } from "@/lib/store";
import { Separator } from "../ui/separator";

interface Props {
  product: Product;
}

export function ProdCard({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [quantity, setQuantity] = useState(1);

  const { addToCart, removeFromCart, cart } = useCart();

  const handleAddToCart = () => {
    const payload: Item = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
    };
    addToCart(payload);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  const isAdded = () => {
    return cart?.some((item) => item.id === product.id);
  };

  const sizes: Size[] = ["XS", "S", "M", "L", "XL"];

  return (
    <Card className="p-4">
      <CardContent className="flex max-md:flex-col justify-between  gap-4">
        <div className="w-96 h-96 relative">
          <Image
            src={`${product.image}`}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        <div className=" flex  justify-center items-center flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold capitalize">{product.name}</h1>
            <p className="text-gray-500">{product.description}</p>
            <Badge>{product.price.toLocaleString()} Rwf</Badge>
          </div>
          <Separator/>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  size="sm"
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div >
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={quantity <= 1}
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                readOnly
                min={1}
                className="w-20 text-center"
              />
              <Button variant="outline" size="icon" onClick={handleIncrement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <Button
                className={cn("w-full disabled:cursor-not-allowed", {
                  "bg-destructive": isAdded(),
                })}
                onClick={isAdded() ? handleRemoveFromCart : handleAddToCart}
              >
                {isAdded() ? "Remove" : "Add To Cart"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
