import axios, { AxiosInstance } from "axios";
import config from "./config";

const BASE_URL = config.API_URL || "http://localhost:8000/api";
console.log(BASE_URL,'api url')

const createAxiosInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
};

export const axiosPrivate = createAxiosInstance(BASE_URL);

export const axiosUser = createAxiosInstance(`${BASE_URL}/user`);



