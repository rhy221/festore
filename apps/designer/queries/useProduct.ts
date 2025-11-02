import productsAction from "@/api/products.api"
import { DesignResType } from "@/schema/design.schema"
import { useQuery } from "@tanstack/react-query"


export const useProducts = () =>{
    return useQuery<DesignResType[]>({
        queryKey: ["designs"],
        queryFn: productsAction.get,
        gcTime: 0,
    })
}