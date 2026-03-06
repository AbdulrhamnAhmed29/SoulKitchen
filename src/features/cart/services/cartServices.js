import { baseApi } from "../../../api/baseApi"

export const cartServices = {
    // get all cart data 
    getAllCart: async (params = {}) => {
        const res = await baseApi.getAll(`/users/me?populate[cart_items][populate][product][populate][0]=image&populate[cart_items][populate][product][populate][1]=category`);
        return res.cart_items
    },

    create: async (item) => {
        const res = await baseApi.create("/cart-items", item)
        console.log(item);
        return res.data
    },

    deleteCartData: async (id) => {
        const res = await baseApi.delete("/cart-items", id);
        return res.data
    },
    updateData: async (id, quantity) => {
        const res = await baseApi.update("/cart-items", id, quantity);
        return res.data;
    }
}