export type OrderItem = {
  productId: string;

  price: number;

  productName: string;
}

export type Order = {
  userId: string;

  items: OrderItem[];

  totalAmount: number;

  status: string;

//   shippingAddress: string;

  paymentMethod: string;
}