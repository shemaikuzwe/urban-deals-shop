import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Product } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/action/action";

export default function DeleteDialog({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}) {
  const router = useRouter();
  const [pending, setIsPending] = useState(false);
  const handleClick = async () => {
    await deleteProduct(product.id);
    setIsPending(false)
    setIsOpen(false);
    router.refresh();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            <DialogDescription>
              you want to delete {product.name}
            </DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
            Cancel
          </Button>
          <Button variant={"destructive"} type="submit" onClick={handleClick}>
            {pending ? "Removing" : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
