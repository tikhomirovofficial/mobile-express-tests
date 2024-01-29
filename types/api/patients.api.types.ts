import { ResponseStatus } from "../common.types"
import { PatientApi } from "../entities/patients.types"

//Получить пациенты профиля
export type PatientsDoctorGetReq = {

}
export type PatientDoctorGetRes = {
    pacients: PatientApi[]
} & ResponseStatus

//Получить пациенты по телефону или имени
export type PatientsBySearchReq = {
    pacient: string
}
export type PatientsBySearchRes = {
    pacients: PatientApi[]
} & ResponseStatus