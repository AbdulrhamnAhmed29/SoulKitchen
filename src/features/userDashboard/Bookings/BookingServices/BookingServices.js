import { baseApi } from "../../../../api/baseApi";

export const BookingServices = {
    getAllBooking: async () => {
        const res = await baseApi.getAll("/users/me?populate[reservations][populate][0]=table&populate[reservations][populate][1]=time_slot&populate[image]=*&populate[orders]=*");
        return res;
    },

    deleteBooking: async (id) => {
         const res = await baseApi.delete("/reservations" ,id);
         return res;
    }

}