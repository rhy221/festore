import productsAction from "@/api/products.api"
import { CategoryType, CommentType, DesignResType } from "@/schema/product.schema"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useProducts = () =>{
    return useQuery<DesignResType[]>({
        queryKey: ["designs"],
        queryFn: productsAction.get,
        gcTime: 0,
    })
}

export const useProduct = (id: string) =>{
    return useQuery<DesignResType>({
        queryKey: ["design"],
        queryFn: () => productsAction.getOne(id),
        gcTime: 0,
    })
}

export const useComments = (id: string) =>{
    return useQuery<CommentType[]>({
        queryKey: ["comments"],
        queryFn: () => productsAction.getOneComments(id),
        gcTime: 0,
    })
}

export const useCategories = () =>{
    return useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: productsAction.getCategories,
        gcTime: 0,
    })
}

export const useUploadProduct = () =>{
    
    return useMutation({
        mutationFn: productsAction.upload,
        
    })
}