"use client";
import { type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, use, useState } from "react";
import { Product } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function ImageSlider({
  productsPromise,
}: {
  productsPromise: Promise<Product[]>;
}) {
  const [_, setApi] = useState<CarouselApi>();
  const products = use(productsPromise);
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <Suspense fallback={null}>
      <div className="relative sm:w-[72vh] w-full mx-auto rounded-md p-0">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent className="p-0 h-64 sm:h-80 md:h-96 lg:h-[30rem]  border-0 ">
            {products.map((product, index) => (
              <CarouselItem
                onClick={() => handleClick(product.id)}
                key={index}
                className="p-0 h-full w-full  group relative  hover:shadow-lg transition-all  border-0 cursor-pointer"
              >
                <Card className="p-0 h-full w-full rounded-none border-0">
                  <CardContent className="p-1 w-full h-full">
                    <div className="relative h-full w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        priority={index === 0}
                        sizes={"100vw"}
                        fill
                        className="transition-transform group-hover:scale-105 rounded-sm object-cover object-center"
                      />
                      <div className="absolute left-4 top-2">
                        <Badge
                          variant={"secondary"}
                          className="bg-background/80 backdrop-blur-sm max-md:text-md"
                        >
                          {product.name}
                        </Badge>
                      </div>
                      <div className="absolute right-2 top-2">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-sm max-md:text-md"
                        >
                          {product.price.toLocaleString()} Rwf
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-sm max-w-fit max-md:text-md"
                        >
                          {product.description}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Suspense>
  );
}
