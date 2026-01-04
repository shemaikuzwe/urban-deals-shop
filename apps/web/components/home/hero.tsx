"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@urban-deals-shop/ui/components/button";
import ImageSlider from "@urban-deals-shop/ui/components/img-slider";
import { Product } from "@urban-deals-shop/db/generated/prisma/client";

export function Hero({
  productPromise,
}: {
  productPromise: Promise<Product[]>;
}) {
  return (
    <section className="relative overflow-hidden w-full min-h-[85vh] flex items-center bg-background">
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-2xl md:text-4xl font-bold ">
              Redefine Your <br />
              <span className="text-transparent bg-clip-text bg-primary">
                Shopping Experience
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Premium designs, limited collections, and a refined shopping
              experience built for modern style lovers.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" variant="glow" className="rounded-full" asChild>
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold ring-2 ring-background"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <p>Trusted by 10k+ customers worldwide</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] w-full hidden lg:block"
          >
            <ImageSlider productsPromise={productPromise} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
