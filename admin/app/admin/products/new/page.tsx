import AddForm from "@/components/admin/add-form";
import type { Metadata } from "next";
export default function Page() {
  return <AddForm />;
}

export const metadata: Metadata = {
  title: "Add Product",
};
