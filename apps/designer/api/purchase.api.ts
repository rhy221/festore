import http from "@/lib/http";
import { Purchase } from "@/schema/purchase.schema";

export const purchaseAction = {

    getPurchasedProducts: async () => {
        const response = await http.get<Purchase[]>('/purchases/my-purchases');
        console.log(response.data);
        return response.data;
    }, 

    downloadProduct: async (productId: string) => {
        const response = await http.post(`/purchases/download/${productId}`);
        return response.data;
    }, 
    checkPurchaseStatus: async (productId: string) => {
        const response = await http.get(`/purchases/check/${productId}`);
        return response.data;
    }, 
 
 
};
