import { AxiosResponse } from "axios";
import { GetAllOrdersReq, GetAllOrdersRes, OrdersByPatientGetRes } from "../../types/api/orders.api.types";
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
}