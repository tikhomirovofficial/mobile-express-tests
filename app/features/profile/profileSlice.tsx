import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileCreateForm, ProfileData, ProfileEditTextFields } from "../../../types/entities/user.types";
import { OrderApi } from "../../../types/entities/order.types";
import { GetProfileFilledRes, ProfileCreateReq, ProfileCreateRes, ProfileGetRes } from "../../../types/api/user.api.types";
import { EMAIL } from "../../../rules/masks.rules";
import { AxiosResponse } from "axios";
import { UserApi } from "../../../http/api/user.api";
import { handleTokenRefreshedRequest } from "../../../utils/handleThunkAuth";
import { correctFormDate } from "../../../utils/correctFormDate";


type ProfileSliceState = {
    creating_form: {
        sending: boolean
        err: string,
        disabled: boolean,
        gender: boolean,
        text_fields: ProfileCreateForm
    }
    has_profile: boolean | null
    data: ProfileData,
    form: Omit<ProfileData, "bonus">,
    loadings: {
        profile: boolean
        orders: boolean
    }
}

const initialState: ProfileSliceState = {
    creating_form: {
        sending: false,
        err: "",
        disabled: true,
        gender: true,
        text_fields: {
            passport_numbers: "",
            first_name: "",
            last_name: "",
            subname: "",
            dob: "", // Дата рождения
            pob: "", // Место рождения
            passport_issue_date: "", // Дата выдачи паспорта
            passport_issued_by: "", // Кем выдан паспорт
            email: ""
        }
    },
    has_profile: null,
    data: {
        first_name: "",
        last_name: "",
        subname: "",
        dob: "",
        image: "",
        bonus: 0,
        gender: true
    },
    form: {
        first_name: "",
        last_name: "",
        subname: "",
        dob: "",
        image: "",
        gender: true
    },
    loadings: {
        profile: true,
        orders: false
    }
}

export const getProfile = createAsyncThunk(
    'profile/get',
    async (_, { dispatch }) => {
        const res: AxiosResponse<ProfileGetRes> = await handleTokenRefreshedRequest(UserApi.GetProfile)
        console.log("profile ", res.data);

        return res.data
        // return new Promise<ProfileData>((res, rej) => {
        //     setTimeout(() => {
        //         res({
        //             first_name: "Борис",
        //             last_name: "Борисов",
        //             subname: "Борисович",
        //             dob: "2000-11-11",
        //             image: "/",
        //             bonus: 3,
        //             gender: 1
        //         })
        //     }, 1000)
        // })
    }
)
export const createProfile = createAsyncThunk(
    'profile/create',
    async (req: ProfileCreateReq, { dispatch }) => {
        const res: AxiosResponse<ProfileCreateRes> = await handleTokenRefreshedRequest(UserApi.Create, req)
        if (!res.status) {
            throw new Error("Не удалось создать профиль!")
        }
        return res.data
    }
)
export const getHasProfile = createAsyncThunk(
    'has-profile/get',
    async (_, { dispatch }) => {
        const res: AxiosResponse<GetProfileFilledRes> = await handleTokenRefreshedRequest(UserApi.GetProfileFilled)
        console.log(res.data);

        return res.data
        // return {
        //     id: 1,
        //     is_doc_signed: false,
        //     is_fill_fio: true,
        //     is_phone_confirm: true,
        //     status: true
        // } as GetProfileFilledRes
    }
)

export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        handleProfileForm: (state, action: PayloadAction<{ key: keyof ProfileEditTextFields, val: string }>) => {
            const key = action.payload.key
            const val = action.payload.val

            if (key === "gender") {
                state.form[key] = Boolean(val)
                return
            }
            state.form[key] = val
        },
        handleCreateProfileGender: (state, action: PayloadAction<boolean>) => {
            state.creating_form.gender = action.payload
        },
        handleEditProfileGender: (state, action: PayloadAction<boolean>) => {
            state.form.gender = action.payload
        },
        handleCreateProfileForm: (state, action: PayloadAction<{ key: keyof typeof initialState.creating_form.text_fields, val: string }>) => {
            const key = action.payload.key
            let val = action.payload.val
            const tempCreatingForm: typeof initialState.creating_form.text_fields = JSON.parse(JSON.stringify(state.creating_form.text_fields))

            if (key === "dob" || "passport_issue_date") {
                val = correctFormDate(val)
            }
            tempCreatingForm[key] = val
            state.creating_form.text_fields = tempCreatingForm

            const datesAreValid = tempCreatingForm.dob.length === 10 && tempCreatingForm.passport_issue_date.length === 10
            const pass = tempCreatingForm.passport_numbers.length === 11
            const allFieldsAreNotEmpty = Object.values(tempCreatingForm).every((val) => val.length > 0)
            const emailIsValid = EMAIL.test(tempCreatingForm["email"])

            state.creating_form.disabled = !datesAreValid || !pass || !allFieldsAreNotEmpty || !emailIsValid
        },
        setDefaultProfileForm: state => {
            state.form = state.data
        },
        resetCreateProfileForm: state => {
            state.creating_form = initialState.creating_form
        },
        resetProfileData: state => {
            state.data = initialState.data
            state.form = initialState.form
            state.has_profile = initialState.has_profile
        }
    },
    extraReducers: (builder) => {
        //HAS PROFILE
        builder.addCase(getHasProfile.fulfilled, (state, action) => {
            console.log(`Профиль заполнен: ${action.payload.is_fill_fio}`);
            state.has_profile = action.payload.is_fill_fio
        })
        builder.addCase(getHasProfile.rejected, (state, action) => {
            console.log(action.error);

        })
        //PROFILE
        builder.addCase(getProfile.pending, (state, action) => {
            state.loadings.profile = true
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            console.log(action.payload);

            state.data = action.payload
            state.form = action.payload
            state.loadings.profile = false
        })
        builder.addCase(getProfile.rejected, (state, action) => {
            console.log(action.error);

            state.loadings.profile = false
        })
        //PROFILE CREATE
        builder.addCase(createProfile.pending, (state, action) => {
            state.creating_form.sending = true
        })
        builder.addCase(createProfile.fulfilled, (state, action) => {
            state.has_profile = action.payload.status
            state.creating_form.sending = false
        })
        builder.addCase(createProfile.rejected, (state, action) => {
            state.creating_form.err = "Не удалось создать профиль!"
            state.creating_form.sending = false
        })
    },
})

export const {
    handleProfileForm,
    handleCreateProfileForm,
    handleCreateProfileGender,
    resetCreateProfileForm,
    handleEditProfileGender,
    setDefaultProfileForm,
    resetProfileData
} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer