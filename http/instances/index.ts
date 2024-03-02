import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { getTokens } from "../../utils/storeTokens"

const currentDomain = 1

const domains = [
    "https://dev.advafert.ru",
    "https://api.mobile.expresstest.ru"
]

export const domain = domains[currentDomain]
const URL = domain + "/api/"

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})
const authApi = axios.create({
    baseURL: URL, // Укажите ваш базовый URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
authApi.interceptors.response.use(null, (ctx: AxiosError) => {
    const res = ctx
    if (res.code == "ERR_NETWORK") {
        //alert("ошибка соединения")
    }
    return res
})
authApi.interceptors.request.use(async (config) => {
    const tokens = await getTokens();
    const accessToken = tokens?.access
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export {
    api,
    authApi
}