import axiosClient from "../axios-client"

export const getUser = async()=>{
    const res = await axiosClient.get('/user');
    return res.data;
}

export const validateToken = async()=>{
    const res = await axiosClient.get('/me');
    return res.data;
}