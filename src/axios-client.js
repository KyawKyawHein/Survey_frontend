import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
    baseURL : `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization =`Bearer ${token}`;
    return config
});

axiosClient.interceptors.response.use(response=>{
    return response;
},error=>{
    if(error.response && error.response.status == 401){
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.reload();
        return error;
    }
    throw error;
})

export default axiosClient;
