import { AxiosResponse } from "axios";
import { GetAllOrdersReq, GetAllOrdersRes, OrderDetailsReq, OrderDetailsRes, OrdersByPatientGetReq, OrdersByPatientGetRes } from "../../types/api/orders.api.types";
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
    static async GetById(req: OrderDetailsReq): Promise<AxiosResponse<OrderDetailsRes>> {
        const res: AxiosResponse<OrderDetailsRes> = await authApi.get(`${ORDERS_PATHS.GET_ORDER_BY_ID}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
    static async GetByPatientId(req: OrdersByPatientGetReq): Promise<AxiosResponse<OrdersByPatientGetRes>> {
        console.log("Запрос на ", req.pacient);
        
        const res: AxiosResponse<OrdersByPatientGetRes> = await authApi.get(`${ORDERS_PATHS.GET_ORDERS_BY_PATIENT}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
}