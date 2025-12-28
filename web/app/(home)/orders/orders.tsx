import { getOrderById } from "@/lib/action/server";
import Orders from "@/components/order/orders";
import { getSession } from "@/lib/auth";
export default async function OrdersContent() {
  const session = await getSession();
  const userId: string | undefined = session?.user?.id;
  const orders = await getOrderById(userId);

  return <Orders order={orders} />;
}
