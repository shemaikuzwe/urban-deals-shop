export type Item = {
  id: string;
  price: number;
  quantity: number;
  name: string;
  size: string;
};

export type Order = {
  userNames: string;
  createdAt: Date;
  phoneNumber: string;
  products: Item[];
  totalPrice: number;
};
