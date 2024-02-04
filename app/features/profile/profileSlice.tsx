import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileCreateForm, ProfileData, ProfileEditTextFields } from "../../../types/entities/user.types";
import { OrderApi } from "../../../types/entities/order.types";
import { ProfileCreateReq, ProfileCreateRes } from "../../../types/api/user.api.types";
import { EMAIL } from "../../../rules/masks.rules";


type ProfileSliceState = {
    creating_form: {
        sending: boolean
        err: string,
        disabled: boolean,
        gender: number,
        text_fields: ProfileCreateForm
    }
    has_profile: boolean | null
    orders: OrderApi[],
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
        gender: 1,
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
    orders: [

    ],
    data: {
        first_name: "",
        last_name: "",
        subname: "",
        dob: "",
        image: "",
        bonus: 0,
        gender: 1
    },
    form: {
        first_name: "",
        last_name: "",
        subname: "",
        dob: "",
        image: "",
        gender: 1
    },
    loadings: {
        profile: true,
        orders: false
    }
}

export const getProfile = createAsyncThunk(
    'profile/get',
    async (req, { dispatch }) => {
        return new Promise<ProfileData>((res, rej) => {
            setTimeout(() => {
                res({
                    first_name: "Борис",
                    last_name: "Борисов",
                    subname: "Борисович",
                    dob: "2000-11-11",
                    image: "/",
                    bonus: 3,
                    gender: 1
                })
            }, 1000)
        })
    }
)
export const createProfile = createAsyncThunk(
    'profile/create',
    async (req: ProfileCreateReq, { dispatch }) => {
        const resp: ProfileCreateRes = { status: true }
        if (!resp.status) {
            throw new Error("Не удалось создать профиль!")
        }
        return new Promise<ProfileCreateRes>((res, rej) => {
            setTimeout(() => {
                res(resp)
            }, 1000)
        })
    }
)
export const getHasProfile = createAsyncThunk(
    'has-profile/get',
    async (req, { dispatch }) => {
        return new Promise<boolean>((res, rej) => {
            setTimeout(() => {
                res(false)
            }, 1000)
        })
    }
)

export const getAllOrders = createAsyncThunk(
    'profile/orders/get',
    async (req, { dispatch }) => {
        return new Promise<OrderApi[]>((res, rej) => {
            setTimeout(() => {
                res([{
                    id: 1,
                    status: "",
                    date: "2000-11-11",
                    bonus: 300
                }])
            }, 1000)
        })
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
                state.form[key] = Number(val)
                return
            }
            state.form[key] = val
        },
        handleCreateProfileGender: (state, action: PayloadAction<0 | 1>) => {
            state.creating_form.gender = action.payload
        },
        handleCreateProfileForm: (state, action: PayloadAction<{ key: keyof typeof initialState.creating_form.text_fields, val: string }>) => {
            const key = action.payload.key
            const val = action.payload.val
            const tempCreatingForm: typeof initialState.creating_form.text_fields = JSON.parse(JSON.stringify(state.creating_form.text_fields))

            if (key === "dob") {
                //correcting dob
            }
            if (key == "passport_issue_date") {
                //correcting date
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
        }
    },
    extraReducers: (builder) => {
        //HAS PROFILE
        builder.addCase(getHasProfile.fulfilled, (state, action) => {
            console.log(`Профиль заполнен: ${action.payload}`);
            state.has_profile = action.payload
        })
        //PROFILE
        builder.addCase(getProfile.pending, (state, action) => {
            state.loadings.profile = true
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.data = action.payload
            state.form = action.payload
            state.loadings.profile = false
        })
        builder.addCase(getProfile.rejected, (state, action) => {
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
        //PROFILE ORDERS
        builder.addCase(getAllOrders.pending, (state, action) => {
            state.loadings.orders = true
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.orders = action.payload
            state.loadings.orders = false
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loadings.orders = false
        })
    },
})

export const {
    handleProfileForm,
    handleCreateProfileForm,
    handleCreateProfileGender,
    resetCreateProfileFormStatus,
    setDefaultProfileForm
} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer