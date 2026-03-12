import { baseApi } from "../../../../api/baseApi"

export const orderServices = {

    findAll: async (params) => {
        const res = await baseApi.getAll("/users/me?populate[orders][populate][orderitems][populate][product][populate]=image&populate[orders][populate][checkout]=*");        
        return res;
    },
    deleteOrder: async (id) => {
        const res = await baseApi.delete("/orders", id);
        return res
    },
       findAllItems: async (params) => {
        const res = await baseApi.getAll("/users/me?populate[orders][populate][orderitems][populate][product][populate]=image&populate[orders][populate][checkout]=*");
        return res;
    },
        findById: async (id) => {
        const res = await baseApi.getOne("/orders",id); 
        return res;
    },


}