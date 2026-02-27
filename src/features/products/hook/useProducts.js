import { useQuery } from "@tanstack/react-query";
import productsServices from "../services/ProductsServices";

/**
 * @param {Object} options 
 */
export const useProducts = ( ) => {

  

    return useQuery({
        queryKey: ["products"],
        queryFn: () => productsServices.getAllProduct(),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
    });
};