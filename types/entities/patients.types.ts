import { HasId } from "../common.types"

export type PatientType = {
    firstName: string,
    lastName: string,
    phone: string,
    avatarSrc: string | null,
}
export type PatientApi = {
    first_name: string
    last_name: string
    bonus: number
    date: string,
    phone: string
} & HasId