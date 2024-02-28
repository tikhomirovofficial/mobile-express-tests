import { AxiosResponse } from "axios";
import { api, authApi } from "../instances";
import { USER_PATHS } from "../paths/index.paths";
import { AuthAcceptReq, AuthAcceptRes, AuthRefreshReq, AuthRefreshRes, AuthReq, AuthRes, GetProfileFilledRes, ProfileCreateReq, ProfileCreateRes, ProfileGetRes, StorePushTokenReq, StorePushTokenRes } from "../../types/api/user.api.types";
import { ProfileCreateForm } from "../../types/entities/user.types";

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
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async StorePushToken(req: StorePushTokenReq): Promise<AxiosResponse<StorePushTokenRes>> {
        const res: AxiosResponse<StorePushTokenRes> = await authApi.post(USER_PATHS.STORE_PUSH_TOKEN, req);
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async GetProfile(): Promise<AxiosResponse<ProfileGetRes>> {
        const res: AxiosResponse<ProfileGetRes> = await authApi.get(USER_PATHS.GET_PROFILE);
        if (!res.data) {
            throw res
        }
        return res
    }
    static async Create(req: ProfileCreateReq): Promise<AxiosResponse<ProfileCreateRes>> {
        const res: AxiosResponse<ProfileCreateRes> = await authApi.post(USER_PATHS.CREATE_PROFILE, req);
        if (!res.data) {
            throw res
        }
        return res
    }
}