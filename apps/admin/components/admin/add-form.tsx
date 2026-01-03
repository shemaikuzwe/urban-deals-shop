"use client";
import { useState } from "react";
import Image from "next/image";
import { useActionState, useRef } from "react";
import InputGroup from "@/components/auth/inputGroup";
import { addProduct } from "@/lib/action/action";
import { Button } from "@urban-deals-shop/ui/components/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@urban-deals-shop/ui/components/select";
import { categories } from "@/lib/types/data";
import { Label } from "@urban-deals-shop/ui/components/label";
import { Alert, AlertTitle } from "@urban-deals-shop/ui/components/alert";
import { ImageUp } from "lucide-react";
import { cn } from "@urban-deals-shop/ui/lib/utils";

export default function AddForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch, isPending] = useActionState(addProduct, undefined);
  const [image, setImage] = useState<string | null>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldList = event.target.files;
    if (!fieldList) return;

    const file = fieldList[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImage(e.target?.result as string);
    };

    fileReader.readAsDataURL(file);
  };
  return (
    <div className="flex p-6 border rounded-md mt-10">
      <form action={dispatch} className=" flex max-md:flex-col w-full gap-2">
        <div className=" flex justify-center items-center min-w-96">
          {image ? (
            <Image
              src={image}
              alt={"product image"}
              width={400}
              height={400}
              className=" cursor-pointer"
              onClick={handleImageClick}
            />
          ) : (
            <ImageUp
              className=" h-56 w-56 cursor-pointer"
              onClick={handleImageClick}
            />
          )}
        </div>
        <div className=" flex flex-col gap-2">
          <h2 className={"font-medium text-xl text-black"}>Add Product</h2>
          <InputGroup
            type={"text"}
            label={"product"}
            placeholder="Enter Product name"
          />
          {state?.errors?.product &&
            state.errors.product.map((error) => (
              <span className=" text-destructive" key={error}>
                {error}
              </span>
            ))}
          <InputGroup
            type={"text"}
            label={"description"}
            placeholder="Enter descrption"
          />
          {state?.errors?.description &&
            state.errors.description.map((error) => (
              <span className=" text-destructive" key={error}>
                {error}
              </span>
            ))}
          <InputGroup
            type={"number"}
            label={"price"}
            placeholder="Enter product price"
          />
          {state?.errors?.price &&
            state.errors.price.map((error) => (
              <span className=" text-destructive" key={error}>
                {error}
              </span>
            ))}
          <div>
            <Label>Category</Label>
            <Select name="type">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((item) => (
                    <SelectItem value={item} key={item} className=" capitalize">
                      {item.toLocaleLowerCase()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state?.errors?.type &&
              state.errors.type.map((error) => (
                <span className=" text-destructive" key={error}>
                  {error}
                </span>
              ))}
          </div>

          <input
            name="image"
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {state?.errors?.image &&
            state.errors.image.map((error) => (
              <span key={error} className=" text-destructive">
                {error}
              </span>
            ))}
          <Button
            type="submit"
            disabled={isPending}
            className=" disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Adding.." : "Add Product"}
          </Button>
          {state?.message && (
            <Alert
              className={cn({
                "text-destructive": state.status == "error",
                "text-green-400": state.status == "success",
              })}
            >
              <AlertTitle>{state.message}</AlertTitle>
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}
