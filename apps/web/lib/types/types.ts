import { Size, Status } from "@urban-deals-shop/db/generated/prisma/enums";


export type ProductState = {
  errors?: {
    id?: string[];
    product?: string[];
    price?: string[];
    type?: string[];
    description?: string[];
    image?: string[];
  };
  message: string;
  status: "success" | "error";
};
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  type: string;
  image: string;
};
// export type Order = {
//   id?: string;
//   userId?: string;
//   products: Item[];
//   total_price: number;
//   status: Status;
//   date: Date;
// };
export type TOrder = {
  userId: string;
  amount: number;
  products: string;
};
export type OrderState = {
  status: "success" | "error";
  message?: string
};
export type ChangePasswordState = OrderState & {
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  };
};
export type updateProfileState = OrderState & {
  errors?: {
    email?: string[];
    fullName?: string[];
  };
};
export type LoginError = {
  message: string;
};
export type Item = {
  id: string;
  price: number;
  quantity: number;
  name: string;
  size: Size;
};
export type Cart = {
  cart: Array<Item>;
};
export type Actions = {
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeAll: () => void;
};

export type ChartData = {
  product: string;
  orders: number;
};

export type FormStatus = {
  status: "error" | "success";
  message: string;
};
export type Order = {
  id: string;
  status: Status;
  userNames: string;
  phoneNumber: string;
  totalPrice: number;
  products: Item[];
  createdAt: Date;
  updatedAt: Date;
};
