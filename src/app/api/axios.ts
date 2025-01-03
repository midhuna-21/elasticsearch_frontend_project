import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND || "https://www.bookc.store";

console.log(BASE_URL,'BASE_URL')
const createAxiosInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
};

export const axiosUser = createAxiosInstance(`${BASE_URL}`);
