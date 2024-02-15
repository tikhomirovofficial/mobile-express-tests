import { HasNextPart, HasPart, ResponseStatus } from "../common.types"
import { PatientApi } from "../entities/patients.types"

//Получить пациенты профиля
export type PatientsDoctorGetReq = HasPart
export type PatientDoctorGetRes = {
    pacients: PatientApi[]
} & ResponseStatus & HasNextPart

//Получить пациенты по телефону или имени
export type PatientsBySearchReq = {
    pacient: string
} & HasPart
export type PatientsBySearchRes = {
    pacients: PatientApi[]
} & ResponseStatus & HasNextPart

// Приглашение пациента
export type InvitingCreateReq = {
    dob: string
    gender: 0 | 1,
    email: string
} & Omit<PatientApi, "bonus" | "date" | "id">
export type InvitingCreateRes = ResponseStatus
