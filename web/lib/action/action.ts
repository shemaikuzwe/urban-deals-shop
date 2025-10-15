"use server";
import { ChangePasswordState, updateProfileState } from "@/lib/types/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { OrderState } from "../types/types";
import { changePasswordShema, UpdateUserProfileSchema } from "../types/schema";
import { db } from "../db";
import { z } from "zod";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";
import Stripe from "stripe";

export async function addOrder(
  prevState: OrderState | undefined,
  formData: FormData,
): Promise<OrderState | undefined> {
  const cart = formData.get("cart") as string;
  const totalPrice = formData.get("totalPrice") as string;
  const userId = (await auth())?.user.id as string;
  if (!userId) throw new Error("User not found");
  const amount = parseInt(totalPrice);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "rwf",
          unit_amount: amount,
          product_data: {
            name: "Order",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      buyerId: userId,
      products: cart,
    },
    payment_method_types: ["card", "paypal"],
    // shipping_address_collection: {
    //    allowed_countries:["RW"]
    // },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders?success=order created successfully`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  });
  redirect(stripeSession.url!);
}

export async function changePassword(
  prevState: ChangePasswordState | undefined,
  formData: FormData,
): Promise<ChangePasswordState | undefined> {
  const session = await auth();
  const userId = session?.user?.id as string;
  const validate = changePasswordShema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validate.success) {
    return {
      status: "error",
      message: "Please fill in all fields",
      errors: validate.error.flatten().fieldErrors,
    };
  }
  const {
    newPassword,
    confirmPassword: cpassword,
    currentPassword: password,
  } = validate.data;
  if (newPassword == cpassword) {
    if (await find_password(userId, password)) {
      try {
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            password: newPassword,
          },
        });
        {
          return { status: "success", message: "password changed" };
        }
      } catch (e) {
        return {
          status: "error",
          message: "password not changed",
        };
      }
    }
    return {
      status: "error",
      message: "invalid current password",
    };
  }
  return {
    status: "error",
    message: "invalid current password",
  };
}
const find_password = async (id: string, pass: string) => {
  const psw = await db.user.findFirst({
    where: {
      AND: [
        {
          id: id,
        },
        {
          password: pass,
        },
      ],
    },
  });
  return !!psw;
};

export async function updateProfile(
  prevState: updateProfileState | undefined,
  formData: FormData,
): Promise<updateProfileState | undefined> {
  const session = await auth();
  const userId = session?.user?.id as string;
  const validate = UpdateUserProfileSchema.safeParse({
    email: formData.get("email"),
    fullName: formData.get("fullName"),
  });
  if (!validate.success) {
    return {
      status: "error",
      message: "Please fill in all fields",
      errors: validate.error.flatten().fieldErrors,
    };
  }
  const { email, fullName } = validate.data;

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name: fullName,
      },
    });
    return {
      status: "success",
      message: "Profile updated",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function getSearchProducts(search: string) {
  const products = await db.product.findMany({
    where: {
      OR: [{ name: { contains: search } }],
    },
  });
  return products;
}

export async function getFeaturedProducts() {
  "use cache";

  const products = await db.product.findMany({
    where: { isFeatured: true },
  });
  return products;
}

export async function getLatestProducts() {
  "use cache";
  cacheTag("products");
  const products = await db.product.findMany({
    take: 4,
    orderBy: { id: "desc" },
  });
  return products;
}

export async function getGithubStars(repo: string) {
  "use cache";
  cacheLife("days");
  const stars = await fetch(`https://api.github.com/repos/${repo}`)
    .then((response) => response.json())
    .then((data) => data.stargazers_count)
    .catch((error) => console.error("Error fetching GitHub stars:", error));

  return stars as number;
}
