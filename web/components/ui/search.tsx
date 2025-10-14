"use client";
import Form from "next/form";
import { Input } from "./input";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <Form
      action={"/search"}
      className="flex justify-center items-center sm:w-80 w-52"
    >
      <Input
        name="search"
        placeholder="Search products...."
        onChange={(e) => handleChange(e.target.value)}
      />
    </Form>
  );
}
