import { Suspense } from "react";
import OrdersContent from "@/app/(home)/orders/orders";
import { Metadata } from "next";
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
