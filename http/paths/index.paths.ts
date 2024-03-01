export const USER_PATHS = {
    LOGIN_PHONE: "auth/token/create",
    LOGIN_CODE: "auth/token/get",
    TOKEN_REFRESH: "auth/token/refresh",
    CREATE_PROFILE: "lk/fill_fio_or_passport",
    GET_PROFILE: "lk/get",
    GET_FILLED_PROFILE: "lk/get/pacient/status-fill",
    STORE_PUSH_TOKEN: "lk/add/push/token"
}
export const PATIENTS_PATHS = {
    GET_PATIENTS_GRAF: "lk/get/pacient/graf",
    GET_PATIENTS: "lk/get/pacient",
    GET_PATIENTS_SEARCH: "lk/get/pacient/search",
    GET_PATIENT_BY_ID: "lk/get/pacient/info",
    INVITE: "lk/get/pacient/invite",
    CHECK_EXISTS_PATIENT: "lk/get/pacient/check/lk"
}
export const ORDERS_PATHS = {
    GET_ORDERS_BY_PATIENT: "order/get/pacient",
    GET_DETAILED_ORDERS_BY_PATIENT: "order/get/pacient/orders",
    GET_ORDER_BY_ID: "order/get",
    GET_ORDERS: "order/get/all",
    CREATE_ORDER: "order/create",
    GET_ORDERS_CHRONO: "lk/get/bonus/list"
}
export const ANALYSIS_PATHS = {
    GET_CATEGORIES: "analiz/get/category",
    GET_PRODUCTS_BY_CATEGORY: "analiz/get/analiz",
    GET_PRODUCTS_BY_ID: "analiz/get/analiz/detail",
}