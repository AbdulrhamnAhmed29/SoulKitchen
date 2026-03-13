import { baseApi } from "../../../../api/baseApi"

export const profileServices = {
    getCurrantUser: async () => {
        const res = await baseApi.getAll("users/me?populate=*");
        return res
    }
}