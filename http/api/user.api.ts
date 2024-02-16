import { AxiosResponse } from "axios";
import { api } from "../instances";
import { USER_PATHS } from "../paths/index.paths";
import { AuthReq, AuthRes } from "../../types/api/user.api.types";

export class UserApi {
    static async LoginPhone(req: AuthReq): Promise<AxiosResponse<AuthRes>> {
        const res: AxiosResponse<AuthRes> = await api.post(USER_PATHS.LOGIN_PHONE, req); // Заглушка
        if (!res.data) {
            throw res
        }
        return res;
    }
}