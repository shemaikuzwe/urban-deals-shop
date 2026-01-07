import { z } from "zod";
import { categories } from "./data";

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size == 0 || file.type.startsWith("image/"), {
    message: "File type not supported",
  });

const productSchema = z.object({
  id: z.string(),
  product: z.string().min(3, { message: "Enter product name" }),
  description: z.string().min(5, { message: "Enter product description" }),
  type: z.enum(categories),
  price: z.coerce.number().gt(100, "Enter product price"),
  image: fileSchema.refine((file) => file.size > 0, {
    message: "Please upload image",
  }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(5, { message: "This password is not strong" }),
});

const UpdateUserProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  fullName: z.string().min(5, { message: "Enter your full names" }),
});
export { productSchema, UpdateUserProfileSchema, fileSchema, loginSchema };
