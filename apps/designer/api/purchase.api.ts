import http from "@/libs/http";
import { Purchase } from "@/schemas/purchase.schema";

export const purchaseAction = {

    getPurchasedProducts: async (params?: any) => {
        const response = await http.get('/purchases/my-purchases', {params});
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
