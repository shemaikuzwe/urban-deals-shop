"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import ImageSlider from "../ui/img-slider";
import { Product } from "@prisma/client";

export function Hero({
  productPromise,
}: {
  productPromise: Promise<Product[]>;
}) {
  return (
    <section className="relative overflow-hidden w-full min-h-[85vh] flex items-center bg-background">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold ">
              Redefine Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Digital Style
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Experience the fusion of high-street fashion and digital
              aesthetics. Premium quality, exclusive drops, and designs that
              speak louder than words.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" variant="glow" className="rounded-full" asChild>
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2"
                asChild
              >
                <Link href="/products">View Products</Link>
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
