import { baseApi } from "../../../api/baseApi";
import qs from 'qs'; 

const productsServices = {
    // get all products 

    getAllProduct: async ({ page = 1, pageSize = 8, sort = 'createdAt:desc' }) => {
        const query = qs.stringify({
            sort: [sort],
            pagination: {
                page: page,
                pageSize: pageSize,
            },
            populate: '*', 
        }, {
            encodeValuesOnly: true, 
        });

        const res = await baseApi.getAll(`/products?${query}`);
        return res;
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