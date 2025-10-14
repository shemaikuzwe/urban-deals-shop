import { z } from "zod";
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size == 0 || file.type.startsWith("image/"), {
    message: "File type not supported",
  });
const Category = z.enum(["T_SHIRT", "PANTS", "SHORTS", "SHOES", "OTHER"]);
const productSchema = z.object({
  id: z.string(),
  product: z.string().min(3, { message: "Enter product name" }),
  description: z.string().min(5, { message: "Enter product description" }),
  type: Category,
  price: z.coerce.number().gt(100, "Enter product price"),
  image: fileSchema.refine((file) => file.size > 0, {
    message: "Please upload image",
  }),
});

const changePasswordShema = z
  .object({
    currentPassword: z
      .string()
      .min(3, { message: "This Passsword is not strong" }),
    newPassword: z.string().min(3, { message: "This password is not strong" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword !== data.currentPassword, {
    message: "Password mismatch",
    path: ["confirmPassword"],
  });

const UpdateUserProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  fullName: z.string().min(5, { message: "Enter your full names" }),
});
export {
  productSchema,
  changePasswordShema,
  UpdateUserProfileSchema,
  fileSchema,
};
