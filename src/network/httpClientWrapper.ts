import { AxiosInstance } from "axios";

export const getAxios = (axios: AxiosInstance)=>{
    let token = localStorage.getItem("aislUserToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios;
}