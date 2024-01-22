import { AxiosResponse } from "axios";
import { api } from "../instances";
import { USER_PATHS } from "../paths/user.paths";

export class UserApi {
    static async getProfile(): Promise<AxiosResponse<any>> {
        const res: AxiosResponse<any> = await api.get(USER_PATHS.LOGIN); // Заглушка
        return res;
    }
}