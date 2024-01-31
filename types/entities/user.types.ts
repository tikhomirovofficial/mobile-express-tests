export type ProfileData = {
    first_name: string
    last_name: string
    subname: string
    dob: string
    image: string
    gender: number,
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