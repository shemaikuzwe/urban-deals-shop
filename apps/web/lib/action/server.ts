import "server-only";
import { db } from "@urban-deals-shop/db";
import type { Category } from "@urban-deals-shop/db/generated/prisma/enums";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import type { TOrder } from "@/lib/types/types";
import { revalidateTag } from "next/cache";

export async function getProducts() {
  "use cache";
  cacheLife("minutes");
  return db.product.findMany();
}

export async function getProduct(id: string) {
  "use cache";
  cacheLife("minutes");
  return db.product.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getOrderById(id: string | undefined) {
  "use cache";
  cacheLife("minutes");
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
  cacheLife("minutes");
  return await db.product.findMany({
    where: {
      type: type,
      id: {
        not: id,
      },
    },
  });
}
