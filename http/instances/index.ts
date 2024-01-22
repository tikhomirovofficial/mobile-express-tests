import axios from "axios"

const currentDomain = 0

const domains = [
    "test"
]

export const domain = domains[currentDomain]
const URL = domain + "/api"

export const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
    }
})