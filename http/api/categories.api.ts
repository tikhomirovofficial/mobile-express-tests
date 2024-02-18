import { AxiosResponse } from "axios";
import { GetAllOrdersReq, GetAllOrdersRes, OrdersByPatientGetRes } from "../../types/api/orders.api.types";
import { authApi } from "../instances";
import { ANALYSIS_PATHS, ORDERS_PATHS, USER_PATHS } from "../paths/index.paths";
import { ConvertDataToGetParams } from "../../utils/ConvertDataToGetParams";
import { CategoriesGetReq, CategoriesGetRes } from "../../types/api/categories.api.types";

export class CategoriesApi {
    static async GetByTitle(req: CategoriesGetReq): Promise<AxiosResponse<CategoriesGetRes>> {
        const res: AxiosResponse<CategoriesGetRes> = await authApi.get(`${ANALYSIS_PATHS.GET_CATEGORIES}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
}