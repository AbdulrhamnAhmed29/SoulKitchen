import { useQuery } from "@tanstack/react-query";
import productsServices from "../services/ProductsServices";

/**
 * @param {Object} options 
 */
export const useProducts = ( { page = 1, pageSize = 6, searchTerm = "", categoryName = "" } =  {}) => {

    const filters = {
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
    };


    if (searchTerm) {
        filters["filters[name][$contains]"] = searchTerm;
    }

    if (categoryName && categoryName !== "All") {
        filters["filters[category][name][$eq]"] = categoryName;
    }

    return useQuery({
        queryKey: ["products", page, pageSize, searchTerm, categoryName],
        queryFn: () => productsServices.getAllProduct(filters),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
    });
};