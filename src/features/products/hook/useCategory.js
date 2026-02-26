import { useQuery } from "@tanstack/react-query";
import productsServices from "../services/ProductsServices";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: productsServices.getAllCategories,
    });
};