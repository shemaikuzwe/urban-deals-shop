import { OrderManagement } from "@/components/admin/order-management";
import { getOrders } from "@/lib/action/server";

export default async function Page() {
  const orders = getOrders();
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl text-center font-bold mb-6">Orders</h1>
      <OrderManagement ordersPromise={orders} />
    </div>
  );
}
