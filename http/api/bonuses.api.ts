import { AxiosResponse } from "axios";
import { GetAllOrdersReq, GetAllOrdersRes, OrdersByPatientGetRes } from "../../types/api/orders.api.types";
import { authApi } from "../instances";
import { ORDERS_PATHS, PATIENTS_PATHS, USER_PATHS } from "../paths/index.paths";
import { ConvertDataToGetParams } from "../../utils/ConvertDataToGetParams";
import { BonusesDiagramGetRes } from "../../types/api/finances.api.types";

export class BonusesApi {
    static async GetDiagram(): Promise<AxiosResponse<BonusesDiagramGetRes>> {
        const res: AxiosResponse<BonusesDiagramGetRes> = await authApi.get(`${PATIENTS_PATHS.GET_PATIENTS_GRAF}`);
        if (!res.data) {
            throw res
        }
        return res
    }
}