import { baseApi } from "../../../api/baseApi";

const productsServices = {
    // get all products 
    getAllProduct: async (params = {}) => {
        return await baseApi.getAll("/products");
    },
    // get one by id 
    getProductById: async (id) => {
        return await baseApi.getOne(`/products/${id}?populate=*`);
    },

    // catiegoties 
    getAllCategories: async (params = {}) => {
        return await baseApi.getAll("/categories");

    }
};

export default productsServices;