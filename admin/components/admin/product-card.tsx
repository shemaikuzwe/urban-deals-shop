"use client";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import DeleteDialog from "./delete-dialog";
import { Checkbox } from "../ui/checkbox";
import { updateFeatured } from "@/lib/action/action";
import { useFormStatus } from "react-dom";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(product.isFeatured);
  const [state, action] = useActionState(updateFeatured, undefined);
  useEffect(() => {
    console.log("success");
    if (state) {
      product.isFeatured = state.status;
    }
  }, [state]);
  return (
    <>
      <Card>
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={`${product.image}`}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold leading-none tracking-tight capitalize">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                {product.type}
              </Badge>
            </div>
            <p className="font-semibold">
              {product.price.toLocaleString()} RWF
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2 flex justify-between">
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    router.push(`/admin/products/edit/${product.id}`)
                  }
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit product</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit product</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove roduct</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className=" bg-destructive">
                Remove product
              </TooltipContent>
            </Tooltip>
          </div>
          <form
            className=" flex flex-col justify-center items-center gap-1"
            action={action}
          >
            <Checkbox
              defaultChecked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              name="featured"
            />
            <input type="hidden" name="id" value={product.id} />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isChecked !== product.isFeatured ? 1 : 0,
                height: isChecked !== product.isFeatured ? "auto" : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <SubmitButton />
            </motion.div>
          </form>
        </CardFooter>
      </Card>
      {isOpen && (
        <DeleteDialog product={product} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={"disabled:cursor-not-allowed disabled:opacity-90"}
      size={"sm"}
    >
      {pending ? "Saving .." : "Save"}
    </Button>
  );
}
