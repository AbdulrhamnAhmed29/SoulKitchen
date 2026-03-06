import { keepPreviousData, useQuery } from "@tanstack/react-query";
import productsServices from "../services/ProductsServices";

/**
 * @param {Object} options 
 */
export const useProducts = (params) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => productsServices.getAllProduct(params),
        placeholderData: keepPreviousData, 
        staleTime: 1000 * 60 * 5,
    });
};