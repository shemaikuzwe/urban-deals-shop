"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@urban-deals-shop/ui/components/button";
export default function Pagination({ pages }: { pages: number[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchparams = useSearchParams();
  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchparams);
    params.set("page", page.toString());
    if (page === 1) {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    handlePage(currentPage);
  }, [currentPage]);

  return (
 
    <div
     className={
        "inline-flex -space-x-px rounded-md shadow-sm gap-2 text-white mx-auto mt-5"
      }
    >
      <Button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className=" disabled:opacity-70"
      >
        Previous
      </Button>
      {pages.map((page, index) => (
        <Button
          key={index}
          disabled={currentPage === index + 1}
          onClick={() => setCurrentPage(page)}
          className="disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {page}
        </Button>
      ))}

      <Button
        disabled={currentPage === pages.length}
        onClick={handleNext}
        className=" disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Next
      </Button>
    </div>

  );
}
