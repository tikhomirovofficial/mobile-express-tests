import { AxiosResponse } from "axios";
import { CreateOrderReq, CreateOrderRes, GetAllFinancesOrdersReq, GetAllFinancesOrdersRes, GetAllOrdersReq, GetAllOrdersRes, OrderDetailsReq, OrderDetailsRes, OrdersByPatientGetReq, OrdersByPatientGetRes } from "../../types/api/orders.api.types";
import { authApi } from "../instances";
import { ORDERS_PATHS, USER_PATHS } from "../paths/index.paths";
import { ConvertDataToGetParams } from "../../utils/ConvertDataToGetParams";

export class OrdersApi {

    static async GetAll(req: GetAllOrdersReq): Promise<AxiosResponse<GetAllOrdersRes>> {
        const res: AxiosResponse<GetAllOrdersRes> = await authApi.get(`${ORDERS_PATHS.GET_ORDERS}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
    static async GetAllChrono(req: GetAllFinancesOrdersReq): Promise<AxiosResponse<GetAllFinancesOrdersRes>> {
        const res: AxiosResponse<GetAllFinancesOrdersRes> = await authApi.get(`${ORDERS_PATHS.GET_ORDERS_CHRONO}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
    static async GetById(req: OrderDetailsReq): Promise<AxiosResponse<OrderDetailsRes>> {
        const res: AxiosResponse<OrderDetailsRes> = await authApi.get(`${ORDERS_PATHS.GET_ORDER_BY_ID}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
    static async Create(req: CreateOrderReq): Promise<AxiosResponse<CreateOrderRes>> {
        const res: AxiosResponse<CreateOrderRes> = await authApi.post(ORDERS_PATHS.CREATE_ORDER, req);
        if (!res.data) {
            throw res
        }
        return res
    }
    static async GetByPatientId(req: OrdersByPatientGetReq): Promise<AxiosResponse<OrdersByPatientGetRes>> {

        const res: AxiosResponse<OrdersByPatientGetRes> = await authApi.get(`${ORDERS_PATHS.GET_ORDERS_BY_PATIENT}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
}