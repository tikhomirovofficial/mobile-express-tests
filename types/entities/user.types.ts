import { ProfileCreateReq } from "../api/user.api.types"

export type ProfileData = {
    first_name: string
    last_name: string
    subname: string
    dob: string
    image: string
    gender: boolean,
    bonus: number
}
export type ProfilePersonData = {
    pob: string
    passport_issue_date: string
    passport_issued_by: string,
    passport_series: string,
    passport_id: string,
    email: string
}
export type ProfileEditTextFields = Pick<ProfileData, | "first_name" | "last_name" | "subname" | "gender">
export type ProfileCreateForm = Omit<ProfileCreateReq, "passport_series" | "passport_id" | "image" | "gender"> & {
    passport_numbers: string
}