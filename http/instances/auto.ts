import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { getTokens } from "../../utils/storeTokens"

let currentDomain = 0

const domains = [
    "https://dev.advafert.ru"
]
export const domain = domains[currentDomain];

const getValidDomain = () => {
    return new Promise((resolve, reject) => {
        const checkDomain = (index: number) => {
            axios.get(domains[index])
                .then(() => {
                    currentDomain = index;
                    resolve(domains[index]);
                })
                .catch(() => {
                    const nextIndex = (index + 1) % domains.length;
                    if (nextIndex === currentDomain) {
                        reject(new Error("All domains are unreachable"));
                    } else {
                        checkDomain(nextIndex);
                    }
                });
        };

        checkDomain(currentDomain);
    });
};

const fetchFromValidDomain = async (url: string) => {
    const validDomain = await getValidDomain();
    const URL = validDomain + url;

    const api = axios.create({
        baseURL: URL,
        withCredentials: true,
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
        }
    });

    return api;
};

const apiPromise = fetchFromValidDomain("/api/");
const authApiPromise = fetchFromValidDomain("/api/auth");

const setupAuthApi = async () => {
    const authApi = await authApiPromise;

    authApi.interceptors.response.use(null, (ctx) => {
        const res = ctx;
        if (res.code === "ERR_NETWORK") {
            //alert("ошибка соединения")
        }
        return res;
    });

    authApi.interceptors.request.use(async (config) => {
        const tokens = await getTokens();
        const accessToken = tokens?.access;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return authApi;
};

const apiServices = async () => {
    const api = await apiPromise;
    const authApi = await setupAuthApi();

    return { api, authApi };
};

export default apiServices;
