import http from "@/lib/http";
import { Cart } from "@/schemas/cart.schema";

export const cartAction = {
  
    getCart: async () => {
        const response = await http.get<Cart>('/cart');
        return response.data;
    }, 
  
    addToCart: async (productId: string) => {
        const response = await http.post<Cart>('/cart/add', { productId });
        return response.data;
    },
  
    removeFromCart: async (productId: string) => {
        const response = await http.delete<Cart>('/cart/remove', { data: { productId } });
        return response.data;
    },
  
    clearCart: async () => {
       const response = await http.delete<Cart>('/cart/clear');
       return response.data;
    }
};