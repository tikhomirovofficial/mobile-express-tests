import { AxiosResponse } from "axios";
import { api, authApi } from "../instances";
import { USER_PATHS } from "../paths/index.paths";
import { AuthAcceptReq, AuthAcceptRes, AuthRefreshReq, AuthRefreshRes, AuthReq, AuthRes, GetProfileFilledRes, ProfileGetRes } from "../../types/api/user.api.types";

export class UserApi {
    static async LoginPhone(req: AuthReq): Promise<AxiosResponse<AuthRes>> {
        const res: AxiosResponse<AuthRes> = await api.post(USER_PATHS.LOGIN_PHONE, req);
        return res;
    }
    static async LoginCode(req: AuthAcceptReq): Promise<AxiosResponse<AuthAcceptRes>> {
        const res: AxiosResponse<AuthAcceptRes> = await api.post(USER_PATHS.LOGIN_CODE, req);
        return res;
    }
    static async RefreshToken(req: AuthRefreshReq): Promise<AxiosResponse<AuthRefreshRes>> {
        const res: AxiosResponse<AuthRefreshRes> = await api.post(USER_PATHS.TOKEN_REFRESH, req);
        return res;
    }
    static async GetProfileFilled(): Promise<AxiosResponse<GetProfileFilledRes>> {
        const res: AxiosResponse<GetProfileFilledRes> = await authApi.get(USER_PATHS.GET_FILLED_PROFILE);
        return res;
    }
    static async GetProfile(): Promise<AxiosResponse<ProfileGetRes>> {
        const res: AxiosResponse<ProfileGetRes> = await authApi.get(USER_PATHS.GET_PROFILE);
        if (!res.data) {
            throw res
        }
        return res
    }
}