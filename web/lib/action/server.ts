import "server-only";
import { db } from "@/lib/db";
import { TOrder } from "@/lib/types/types";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import { Category } from "@prisma/client";

export async function getProducts() {
  "use cache";
  cacheTag("products");
  return db.product.findMany();
}

export async function getProduct(id: string) {
  "use cache";
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
    take: 5,
  });
}

export async function addOrder(order: TOrder) {
  await db.order.create({
    data: {
      userId: order.userId,
      total_price: order.amount,
      products: JSON.parse(order.products),
    },
  });
  revalidateTag("orders", "max");
}

export async function getRelatedProducts(type: Category, id: string) {
  "use cache";
  cacheTag("products");
  return await db.product.findMany({
    where: {
      type: type,
      id: {
        not: id,
      },
    },
  });
}
