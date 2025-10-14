"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { categories } from "@/lib/types/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Categories() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const initialCategories = searchParams.get("category");
    return initialCategories ? initialCategories.split(",") : [];
  });
  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((cat) => cat !== category);

    setSelectedCategories(updatedCategories);

    // Update the URL
    const params = new URLSearchParams(searchParams);
    if (updatedCategories.length > 0) {
      params.set("category", updatedCategories.join(","));
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="lg:block w-40">
      <div className="py-6">
        <h2 className="text-lg font-medium">Categories</h2>
        <div className="mt-4 space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label htmlFor={category} className="capitalize">
                {category.toLowerCase()}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
