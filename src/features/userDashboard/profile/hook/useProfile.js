import {  useQuery  } from "@tanstack/react-query"
import { profileServices } from "../services/profileSerfices"

export const useProfile = () => {

    const CurrantUser = useQuery({
        queryKey: ["currantuser"],
        queryFn: profileServices.getCurrantUser,
    });

    

   
    return {
        //  get curran user data and loading state
        userData: CurrantUser.data,
        isLoading: CurrantUser.isLoading,

   

    }

}