import axios from "axios";

const API_URL = 'http://localhost:3004'
axios.defaults.baseURL= API_URL

export const getAll = (params: any) => {
    console.log(params["queryKey"])
    return axios.get("/vacancies?"+params["queryKey"][1])
}