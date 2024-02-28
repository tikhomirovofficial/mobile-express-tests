import { HasId, JWT, ResponseStatus } from "../common.types"
import { ProfileData, ProfilePersonData } from "../entities/user.types"

//Регитсрация или Авторизация по телефону
export type AuthReq = {
    username: string
}
export type AuthRes = ResponseStatus

//Подтверждение кода
export type AuthAcceptReq = {
    username: string
    password: string
}
export type AuthAcceptRes = JWT & { details?: string }

// Перевыпустить refresh токен
export type AuthRefreshReq = Pick<JWT, "refresh">
export type AuthRefreshRes = Pick<JWT, "access">

// Получить данные пользователя
export type ProfileGetRes = ProfileData & ResponseStatus

// Записать токен пуш-уведомлений
export type StorePushTokenReq = {
    token: string
    is_push: boolean
}
export type StorePushTokenRes = ResponseStatus

// Получить статус заполненности профиля
export type GetProfileFilledRes = {
    id: number,
    is_doc_signed: boolean,
    is_phone_confirm: boolean,
    is_fill_fio: boolean,
    push_token: string
} & HasId & ResponseStatus

// Регистрация профиля
export type ProfileCreateReq = Omit<ProfileData, "bonus" | "image"> & ProfilePersonData
export type ProfileCreateRes = {
    url: string
} & ResponseStatus