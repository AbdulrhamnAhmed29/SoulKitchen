import { baseApi } from "../../../api/baseApi"

export const bookingSystem = {
    createReservation: async (data) => {
        const res = await baseApi.create("/reservations?populate=*", data);     
        return res.data
    },

    createTable: async (data) => {
        const res = await baseApi.create("/tables", data);
        return res.data
    },

    createTime_Slot: async (data) => {
        const res = await baseApi.create("/time-slots", data);
        return res.data
    },

}