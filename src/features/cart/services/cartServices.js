import { baseApi } from "../../../api/baseApi"

export const cartServices = {
    // get all cart data 
    getAllCart: async () => {
        const res = await baseApi.getAll("/cart-items");
        return res.data
    },

    create: async (data) => {
        const res = await baseApi.create("/cart-items", data);
        return res.data 
    },

    deleteCartData: async (id) => {
        const res = await baseApi.delete("/cart-items", id);
        return res.data
    },
    updateData: async (id, quantity) => {
        const res = await baseApi.update("/cart-items", id);
        return res.data
    }

}