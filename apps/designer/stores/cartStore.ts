import { create } from 'zustand';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: any;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  setCart: (items: CartItem[], totalAmount: number) => void;
  clearLocalCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalAmount: 0,
  
  setCart: (items, totalAmount) => set({ items, totalAmount }),
  
  clearLocalCart: () => set({ items: [], totalAmount: 0 }),
}));