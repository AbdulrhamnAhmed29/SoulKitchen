import { useQuery } from "@tanstack/react-query"
import { profileServices } from "../services/profileSerfices"

export const useProfile = () => {
    const CurrantUser = useQuery({
        queryKey: ["currantuser"],
        queryFn: profileServices.getCurrantUser,
    });

    return {
        userData: CurrantUser.data,
    }

}