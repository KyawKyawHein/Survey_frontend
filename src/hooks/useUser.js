import { useQuery } from "@tanstack/react-query"
import { getUser, validateToken } from "../api/User"

const useUserQuery = ()=>{
    return useQuery({
        queryKey : ['get','user'],
        queryFn : getUser
    })
}

const useValidateToken = ()=>{
    return useQuery({
        queryKey : ['get','me'],
        queryFn:validateToken
    })
}

export const useUser =()=> {
    return {
        useUserQuery,
        useValidateToken
    }
}