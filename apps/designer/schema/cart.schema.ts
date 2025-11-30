export type CartItem  = {
  productId: string;
  title: string;
  imageUrls: string[];
  price: number;
  designer: {
    name: string;
    email: string;
  }
}

export type Cart  = {
  userId: string;

  items: CartItem[];

  totalAmount: number;
}
