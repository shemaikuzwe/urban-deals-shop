"use server";
import type {
  ChangePasswordState,
  LoginState,
  ProductState,
  updateProfileState,
} from "@/lib/types/types";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  changePasswordShema,
  fileSchema,
  productSchema,
  UpdateUserProfileSchema,
} from "../types/schema";
import { z } from "zod";
import { auth, getProduct } from "@/lib/action/server";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";

const AddProduct = productSchema.omit({ id: true });

import { UTApi } from "uploadthing/server";
import { getKeyFromUrl } from "../utils";
import { db } from "@urban-deals-shop/db";
import type { Status } from "@urban-deals-shop/db/generated/prisma/enums";

const utapi = new UTApi({
  // ...options,
});

export async function login(
  prevState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  try {
    const validate = z
      .object({
        email: z
          .string({ invalid_type_error: "Invalid email" })
          .email({ message: "Invalid email" }),
        password: z
          .string({ invalid_type_error: "Invalid password" })
          .min(3, { message: "Password must be at least 3 characters" }),
      })
      .safeParse(Object.fromEntries(formData.entries()));
    if (!validate.success) {
      return {
        errors: validate.error.flatten().fieldErrors,
        status: "error",
      };
    }
    const user = await db.admin.findUnique({
      where: {
        email: validate.data.email,
      },
    });
    if (!user)
      return {
        status: "error",
        errors: {
          email: ["Invalid credentials"],
        },
      };
    const isValid = await bcrypt.compare(
      validate.data.password,
      user.password ?? "",
    );
    if (!isValid)
      return {
        status: "error",
        errors: {
          email: ["Invalid credentials"],
        },
      };
    const secretKey = process.env.AUTH_SECRET;
    if (!secretKey) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }
    const key = jose.base64url.decode(secretKey!);
    const token = await new jose.SignJWT({
      id: user.id,
      email: user.email,
      sub: user.id,
      createdAt: user.createdAt,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(key);
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { status: "success", message: "Login successful" };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Login failed",
    };
  }
}
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/");
}
export async function refreshOrders() {
  revalidateTag("orders", "max");
  revalidatePath("/admin/orders");
}
export async function addProduct(
  prevState: ProductState | undefined,
  formData: FormData,
): Promise<ProductState | undefined> {
  const validate = AddProduct.safeParse(Object.fromEntries(formData.entries()));
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Missing fields",
      status: "error",
    };
  }

  const { product, price, description, type, image } = validate.data;
  const imagePath = await uploadProduct(image);
  await db.product.create({
    data: {
      name: product,
      price: price,
      description: description,
      type: type,
      image: imagePath ?? "",
    },
  });
  revalidateTag("products", "max");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const prod = await getProduct(id);
  await deleteProd(prod?.image as string);
  await db.product.delete({
    where: {
      id: id,
    },
  });
  revalidateTag("products", "max");
  redirect("/admin/products");
}

export async function updateStatus(id: string, status: Status) {
  await db.order.update({ where: { id }, data: { status } });
  revalidateTag("orders", "max");
  revalidatePath("/admin/orders");
}

export async function editProduct(
  prevState: ProductState | undefined,
  formData: FormData,
): Promise<ProductState | undefined> {
  const validate = productSchema
    .omit({
      image: true,
    })
    .extend({
      id: z.string(),
      image: fileSchema.optional(),
    })
    .safeParse(Object.fromEntries(formData.entries()));
  if (!validate.success) {
    console.log(validate.error.errors);

    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Please fill in all fields",
      status: "error",
    };
  }
  const { product, description, price, type, id, image } = validate.data;
  const prod = await getProduct(id);

  let imagePath = prod?.image;
  if (image?.size) {
    imagePath = await uploadProduct(image);
  }
  if (prod?.image) {
    await deleteProd(prod?.image);
  }
  await db.product.update({
    where: {
      id: id,
    },

    data: {
      name: product,
      description: description,
      price: price,
      type: type,
      image: imagePath,
    },
  });

  revalidateTag("products", "max");
  redirect("/admin/products");
}
async function uploadProduct(image: File) {
  try {
    const res = await utapi.uploadFiles(image);
    console.log(res.data);
    return res.data?.ufsUrl;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
//TODO: Implement deleteProd function
async function deleteProd(url: string) {
  try {
    const keyId = getKeyFromUrl(url);
    await utapi.deleteFiles(keyId);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function changePassword(
  prevState: ChangePasswordState | undefined,
  formData: FormData,
): Promise<ChangePasswordState | undefined> {
  const session = await auth();
  const userId = session?.data?.id as string;
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
  const { newPassword, currentPassword: password } = validate.data;

  const user = await db.admin.findUnique({
    where: { id: userId },
  });
  if (!user?.password) {
    return {
      message: "No password found",
      status: "error",
      errors: {
        currentPassword: ["No password found"],
      },
    };
  }
  const isValid = bcrypt.compare(password, user?.password);
  if (!isValid) {
    return {
      message: "Password invalid",
      status: "error",
      errors: {
        currentPassword: ["Password Invalid"],
      },
    };
  }
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    status: "error",
    message: "invalid current password",
  };
}

export async function updateProfile(
  prevState: updateProfileState | undefined,
  formData: FormData,
): Promise<updateProfileState | undefined> {
  const session = await auth();
  const userId = session.data?.id as string;
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
    await db.admin.update({
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
    console.log("error", err);
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function updateFeatured(
  prevState: { status: boolean } | undefined,
  formData: FormData,
): Promise<void> {
  const schema = z.object({
    featured: z.string().optional(),
    id: z.string(),
  });
  const validate = schema.safeParse(Object.fromEntries(formData.entries()));
  if (validate.success) {
    const { featured, id } = validate.data;
    const isFeatured = featured !== undefined;
    await db.product.update({
      data: { isFeatured },
      where: { id },
    });
    revalidateTag("products", "max");
    redirect("/admin/products");
    // return { status: isFeatured };
  }
}
