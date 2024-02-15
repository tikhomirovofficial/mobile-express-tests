import { InvitingCreateReq } from "../api/patients.api.types"
import { HasId } from "../common.types"

export type PatientType = {
    firstName: string,
    lastName: string,
    phone: string,
    avatarSrc: string | null,
}
export type PatientApi = {
    first_name: string
    subname?: string,
    image?: string,
    sex?: number,
    dob?: string | null
    last_name: string
    bonus: number
    date: string,
    phone: string
} & HasId
export type InvitingTextFields = Omit<InvitingCreateReq, | "gender" | "sex">