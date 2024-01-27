import { JWT, ResponseStatus } from "../common.types"
import { ProfileData, ProfilePersonData } from "../entities/user.types"

export type AuthReq = {
    phone: string
}
export type AuthRes = ResponseStatus

export type AuthAcceptReq = {
    username: string
    password: string
}
export type AuthAcceptRes = JWT

export type AuthRefreshReq = Pick<JWT, "refresh">
export type AuthRefreshRes = Pick<JWT, "access">

export type ProfileGetRes = ProfileData & ResponseStatus

export type ProfileCreateReq = ProfileData & ProfilePersonData
export type ProfileCreateRes = ResponseStatus