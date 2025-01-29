import "server-only";
import { db } from "@/lib/db";
import { ChartData, TOrder } from "@/lib/types/types";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

export async function getProducts() {
  "use cache";
  cacheTag("products");
  return db.product.findMany();
}

export async function getProduct(id: string) {
  "use cache"
  cacheTag("products");
  return db.product.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getOrders() {
  "use cache";
  cacheTag("orders");
  const orders = await db.order.findMany({
    include: {
      user: true,
    },
  });
  return orders;
}
export type OrderUser = Awaited<ReturnType<typeof getOrders>>;
export async function getAllUsers() {
  "use cache";

  return await db.user.findMany({
    include: { orders: true },
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
  });
}

export async function getOrderById(id: string | undefined) {
  "use cache";
  cacheTag("orders");
  return await db.order.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getUserOrders(userId: string) {
  return await db.order.count({
    where: {
      userId,
    },
  });
}

export async function getUser(email: string, password: string) {
  const user = await db.user.findFirst({
    where: {
      AND: [
        {
          email: email,
        },
        {
          password: password,
        },
      ],
    },
  });
  if (!user) return null;
  return user;
}

export async function getPendingOrders() {
  "use cache";
  cacheTag("orders");
  return await db.order.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      user: true,
    },
  });
}

export async function getChartData() {
  "use cache";
  try {
    const dashboardData = await db.order.findMany();
    const productOrdersMap = new Map<string, Set<string>>();
    dashboardData.forEach((order) => {
      const productsInThisOrder = new Set<string>();

      order?.products?.forEach((product) => {
        //@ts-ignore
        if (product && product.name && !productsInThisOrder.has(product.name)) {
          //@ts-ignore
          const existingSet = productOrdersMap.get(product.name) || new Set();
          existingSet.add(order.id);
          //@ts-ignore
          productOrdersMap.set(product.name, existingSet);
          //@ts-ignore
          productsInThisOrder.add(product.name);
        }
      });
    });
    const chartData: ChartData[] = Array.from(productOrdersMap).map(
      ([product, orderSet]) => ({
        product,
        orders: orderSet.size,
      })
    );

    return chartData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addOrder(order: TOrder) {
  await db.order.create({
    data: {
      userId: order.userId,
      total_price: order.amount,
      products: JSON.parse(order.products),
    },
  });
  revalidateTag("orders");
}
