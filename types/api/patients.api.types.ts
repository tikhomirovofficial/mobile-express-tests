import { HasId, HasNextPart, HasPart, ResponseStatus } from "../common.types"
import { PatientApi } from "../entities/patients.types"

//Получить пациенты профиля
export type PatientsDoctorGetReq = HasPart
export type PatientsDoctorGetRes = {
    pacients: PatientApi[]
} & ResponseStatus & HasNextPart

export type PatientByIdReq = HasId
export type PatientByIdRes = ResponseStatus & {
    pacient: PatientApi
}

//Получить пациенты по телефону или имени
export type PatientsBySearchReq = {
    pacient: string
} & HasPart
export type PatientsBySearchRes = {
    pacients: PatientApi[]
} & ResponseStatus & HasNextPart

//Проверить существование пациента
export type GetIsExistsPatientReq = {
    phone: string
}
export type GetIsExistsPatientRes = {
    exists: boolean
} & ResponseStatus


// Приглашение пациента
export type InvitingCreateReq = {
    dob: string
    gender: 0 | 1,
    email: string
} & Omit<PatientApi, "bonus" | "date" | "id">
export type InvitingCreateRes = {
    user_id: number
} & ResponseStatus
