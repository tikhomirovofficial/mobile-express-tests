import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileCreateForm, ProfileData, ProfileEditTextFields } from "../../../types/entities/user.types";
import { OrderApi } from "../../../types/entities/order.types";
import { ProfileCreateReq, ProfileCreateRes } from "../../../types/api/user.api.types";
import { EMAIL } from "../../../rules/masks.rules";
import { InvitingTextFields } from "../../../types/entities/patients.types";
import { GetIsExistsPatientReq, GetIsExistsPatientRes, InvitingCreateReq, InvitingCreateRes } from "../../../types/api/patients.api.types";
import { correctFormDate } from "../../../utils/correctFormDate";
import { PatientsApi } from "../../../http/api/patients.api";
import { AxiosResponse } from "axios";
import { handleTokenRefreshedRequest } from "../../../utils/handleThunkAuth";


type InvitingSliceState = {

    already_exists: {
        val: boolean | null
        sending: boolean
        err: string
    }
    form: {
        success: boolean | null,
        sending: boolean
        err: string,
        disabled: boolean,
        gender: 0 | 1,
        text_fields: InvitingTextFields
    }
}

const initialState: InvitingSliceState = {
    already_exists: {
        val: null,
        sending: false,
        err: ""
    },
    form: {
        success: null,
        sending: false,
        err: "",
        disabled: true,
        gender: 1,
        text_fields: {
            first_name: "",
            last_name: "",
            phone: "+7",
            dob: "",
            email: ""
        }
    },
}

export const createInviting = createAsyncThunk(
    'inviting/create',
    async (req: InvitingCreateReq, { dispatch }) => {
        const res: AxiosResponse<InvitingCreateRes> = await handleTokenRefreshedRequest(PatientsApi.Invite, req)
        console.log("Приглашение ответ: ", res.data);
        if (!res.status) {
            throw new Error("Не удалось добавить пациента!")
        }
        return res.data
        // return new Promise<InvitingCreateRes>((res, rej) => {
        //     setTimeout(() => {
        //         res(resp)
        //     }, 1000)
        // })
    }
)
export const checkPatientExists = createAsyncThunk(
    'inviting/exists',
    async (req: GetIsExistsPatientReq, { dispatch }) => {
        const res: AxiosResponse<GetIsExistsPatientRes> = await handleTokenRefreshedRequest(PatientsApi.CheckExists, req)
        console.log("exists res ", res.data);
        
        if (!res.status) {
            throw new Error("Не удалось проверить наличие пациента!")
        }
        return res.data
        // return new Promise<InvitingCreateRes>((res, rej) => {
        //     setTimeout(() => {
        //         res(resp)
        //     }, 1000)
        // })
    }
)

export const InvitingSlice = createSlice({
    name: "Inviting",
    initialState,
    reducers: {
        handleCreateInvitingGender: (state, action: PayloadAction<0 | 1>) => {
            state.form.gender = action.payload
        },
        handleCreateInvitingForm: (state, action: PayloadAction<{ key: keyof typeof initialState.form.text_fields, val: string }>) => {
            if (state.form.err) {
                state.form.err = ""
            }
            const key = action.payload.key
            let val = action.payload.val
            const tempCreatingForm: typeof initialState.form.text_fields = JSON.parse(JSON.stringify(state.form.text_fields))

            if (key === "dob") {
                val = correctFormDate(val)
            }

            tempCreatingForm[key] = val
            state.form.text_fields = tempCreatingForm

            const datesAreValid = tempCreatingForm.dob.length === 10
            const allFieldsAreNotEmpty = Object.values(tempCreatingForm).every((val) => val.length > 0)
            const emailIsValid = EMAIL.test(tempCreatingForm["email"])

            state.form.disabled = !datesAreValid || !allFieldsAreNotEmpty || !emailIsValid
        },
        resetSuccessInviting: state => {
            state.form.success = false
        },
        resetCreateInvitingForm: state => {
            state.already_exists = initialState.already_exists
            state.form.text_fields = initialState.form.text_fields
            state.form.gender = initialState.form.gender,
                state.form.disabled = initialState.form.disabled,
                state.form.sending = initialState.form.sending
        }
    },
    extraReducers: (builder) => {
        //CHECK ALDERY PATIENT EXISTS
        builder.addCase(checkPatientExists.pending, (state, action) => {
            if (state.already_exists.err) {
                state.already_exists.err = ""
            }
            state.already_exists.sending = true

        })
        builder.addCase(checkPatientExists.fulfilled, (state, action) => {
            state.already_exists.sending = false
            state.already_exists.val = action.payload.exists
        })
        builder.addCase(checkPatientExists.rejected, (state, action) => {
            state.form.err = action.error.message || "Не удалось выполнить запрос."
            state.already_exists.sending = false
        })
        //INVITING CREATE
        builder.addCase(createInviting.pending, (state, action) => {
            state.form.sending = true
            state.form.success = null
        })
        builder.addCase(createInviting.fulfilled, (state, action) => {
            state.form.sending = false
            state.form.success = true
        })
        builder.addCase(createInviting.rejected, (state, action) => {
            state.form.err = "Не удалось пригласить пациента!"
            state.form.sending = false
            state.form.success = false
        })
    },
})

export const {
    handleCreateInvitingForm,
    handleCreateInvitingGender,
    resetCreateInvitingForm,
    resetSuccessInviting
} = InvitingSlice.actions


export const invitingReducer = InvitingSlice.reducer