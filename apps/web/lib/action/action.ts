"use server";
import type {
  FormStatus,
  updateProfileState,
} from "@/lib/types/types";
import type { OrderState } from "../types/types";
import {
  createOrderSchema,
  UpdateUserProfileSchema,
} from "../types/schema";
import { db } from "@urban-deals-shop/db";
import { cacheLife } from "next/cache";
import { z } from "zod";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import sendContactEmail from "@urban-deals-shop/ui/email/contact";
import { auth, signIn } from "@urban-deals-shop/auth";

export async function logIn() {
  const { redirect: isRedirect, url } = await signIn("google");
  if (isRedirect && url) {
    redirect(url);
  }
}
export async function addOrder(
  prevState: OrderState | undefined,
  formData: FormData
): Promise<OrderState | undefined> {
  const validate = createOrderSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validate.success) {
    return {
      status: "error",
      message: "validation error",
    };
  }
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;
  if (!userId) throw new Error("User not found");
  const { totalPrice: amount, cart } = validate.data;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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
    payment_method_types: [
      "card",
      // "paypal", does not rwf
    ],
    // shipping_address_collection: {
    //    allowed_countries:["RW"]
    // },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders?success=order created successfully`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  });
  if (stripeSession.url) {
    redirect(stripeSession.url);
  }
}

export async function updateProfile(
  prevState: updateProfileState | undefined,
  formData: FormData
): Promise<updateProfileState | undefined> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
export async function sendMessage(
  prevState: FormStatus | undefined,
  formData: FormData
): Promise<FormStatus> {
  try {
    const validate = z
      .object({
        email: z
          .email({ message: "Invalid Email" }),
        message: z
          .string({ message: "Invalid Message" })
          .min(3, { message: "Invalid message" })
          .max(100, { message: "Invalid message" }),
        name: z
          .string({ message: "Invalid name" })
          .min(3, { message: "Invalid name" })
          .max(20, { message: "Invalid name" }),
      })
      .safeParse(Object.fromEntries(formData.entries()));
    if (!validate.success) {
      return {
        status: "error",
        message: z.treeifyError(validate.error).errors[0],
      };
    }
    const { email, message, name } = validate.data;

    await sendContactEmail(name, message, email);
    return {
      status: "success",
      message: "Thanks for your feedback!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: "Something went wrong ! try again",
      };
    }
    return {
      status: "error",
      message: "Message not sent try again !",
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
  cacheLife("minutes")
  const products = await db.product.findMany({
    where: { isFeatured: true },
  });
  return products;
}

export async function getLatestProducts() {
  "use cache";
  cacheLife("minutes")
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
