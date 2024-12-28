import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bookc.store/api";

console.log(BASE_URL,'BASE_URL')
const createAxiosInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
};

export const axiosPrivate = createAxiosInstance(BASE_URL);

export const axiosUser = createAxiosInstance(`${BASE_URL}/user`);
