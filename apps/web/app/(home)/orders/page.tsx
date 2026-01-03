import { Suspense } from "react";
import { Metadata } from "next";
import OrdersContent from "./orders";
export const metadata: Metadata = {
  title: "Orders",
  description: "Orders page",
};
export default async function Page() {
  return (
    <Suspense fallback={null}>
      <OrdersContent />
    </Suspense>
  );
}
