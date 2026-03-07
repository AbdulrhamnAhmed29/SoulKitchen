import { baseApi } from "../../../api/baseApi"

export const checkout = {

    createOrder: async (userData) => {
        const res = await baseApi.create("/check-outs", userData);
        console.log(res);

        return res.data
    },

    FindOrder: async () => {
        const res = await baseApi.getAll("/check-outs");
        return res.data
    },


    createMainOrder: async (data) => {
        const res = await baseApi.create("/orders", data);
        return res.data
    },

    createOrderItems: async (data) => {
        const res = await baseApi.create("/cart-items", data);
        return res.data 
    }
}