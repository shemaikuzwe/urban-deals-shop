import { auth } from "@/app/auth";
import { getOrderById } from "@/lib/action/server";
import { Order } from "@/lib/types/types";
import Orders from "@/components/order/orders";
export default async function OrdersContent() {
  const session = await auth();
  const userId: string | undefined = session?.user?.id;
  const orders = await getOrderById(userId);
  //@ts-ignore
  return <Orders order={orders} />;
}
