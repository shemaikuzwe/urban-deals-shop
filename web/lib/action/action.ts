"use server";
import {
  ChangePasswordState,
  FormStatus,
  updateProfileState,
} from "@/lib/types/types";
import { auth } from "@/app/auth";
import { OrderState } from "../types/types";
import {
  changePasswordShema,
  createOrderSchema,
  UpdateUserProfileSchema,
} from "../types/schema";
import { db } from "../db";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";
import { z } from "zod";
// import sendOrderEmail from "../email/send-order";
// import sendContactEmail from "../email/contact";

export async function addOrder(
  prevState: OrderState | undefined,
  formData: FormData,
): Promise<OrderState | undefined> {
  const validate = createOrderSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validate.success) {
    return {
      status: "error",
      errors: validate.error.flatten().fieldErrors,
    };
  }
  const { totalPrice, address, cart, name, phoneNumber } = validate.data;
  // TODO:send Email
  const order = await db.order.create({
    data: {
      total_price: totalPrice,
      address,
      products: JSON.parse(cart),
      names: name,
      phoneNumber,
    },
  });
  // await sendOrderEmail({
  //   totalPrice,
  //   userNames: name,
  //   phoneNumber,
  //   products: JSON.parse(cart) as any,
  //   createdAt: order.createdAt,
  //   id: order.id,
  //   status: order.status,
  //   updatedAt: new Date(),
  // });
  return {
    status: "success",
    message: "Order added successfully",
  };
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
export async function sendMessage(
  prevState: FormStatus | undefined,
  formData: FormData,
): Promise<FormStatus> {
  try {
    const validate = z
      .object({
        email: z.string().email(),
        message: z.string().min(3).max(40),
        name: z.string().min(3).max(20),
      })
      .safeParse(Object.fromEntries(formData.entries()));
    if (!validate.success) {
      return {
        status: "error",
        message: validate.error.errors[0].message,
      };
    }
    const { email, message, name } = validate.data;
    // await sendContactEmail(name, message, email);
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
