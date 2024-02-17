import { AxiosResponse } from "axios";
import { GetAllOrdersReq, GetAllOrdersRes, OrdersByPatientGetRes } from "../../types/api/orders.api.types";
import { authApi } from "../instances";
import { ORDERS_PATHS, PATIENTS_PATHS, USER_PATHS } from "../paths/index.paths";
import { ConvertDataToGetParams } from "../../utils/ConvertDataToGetParams";
import { PatientsDoctorGetReq, PatientsDoctorGetRes } from "../../types/api/patients.api.types";

export class PatientsApi {
    static async GetAll(req: PatientsDoctorGetReq): Promise<AxiosResponse<PatientsDoctorGetRes>> {
        const res: AxiosResponse<PatientsDoctorGetRes> = await authApi.get(`${PATIENTS_PATHS.GET_PATIENTS}${ConvertDataToGetParams(req)}`);
        if (!res.data) {
            throw res
        }
        return res
    }
}