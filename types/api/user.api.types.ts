import { JWT, ResponseStatus } from "../common.types"
import { ProfileData, ProfilePersonData } from "../entities/user.types"

//Регитсрация или Авторизация по телефону
export type AuthReq = {
    phone: string
}
export type AuthRes = ResponseStatus

//Подтверждение кода
export type AuthAcceptReq = {
    username: string
    password: string
}
export type AuthAcceptRes = JWT

// Перевыпустить refresh токен
export type AuthRefreshReq = Pick<JWT, "refresh">
export type AuthRefreshRes = Pick<JWT, "access">

// Получить данные пользователя
export type ProfileGetRes = ProfileData & ResponseStatus

// Регистрация профиля
export type ProfileCreateReq = ProfileData & ProfilePersonData
export type ProfileCreateRes = ResponseStatus