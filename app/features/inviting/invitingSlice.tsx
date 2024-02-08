import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileCreateForm, ProfileData, ProfileEditTextFields } from "../../../types/entities/user.types";
import { OrderApi } from "../../../types/entities/order.types";
import { ProfileCreateReq, ProfileCreateRes } from "../../../types/api/user.api.types";
import { EMAIL } from "../../../rules/masks.rules";
import { InvitingTextFields } from "../../../types/entities/patients.types";


type InvitingSliceState = {
    form: {
        sending: boolean
        err: string,
        disabled: boolean,
        gender: number,
        text_fields: InvitingTextFields
    }
}

const initialState: InvitingSliceState = {
    form: {
        sending: false,
        err: "",
        disabled: true,
        gender: 1,
        text_fields: {
            first_name: "",
            last_name: "",
            phone: "",
            dob: "",
            email: ""
        }
    },
}

export const createInviting = createAsyncThunk(
    'inviting/create',
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

export const InvitingSlice = createSlice({
    name: "Inviting",
    initialState,
    reducers: {
        handleCreateInvitingGender: (state, action: PayloadAction<0 | 1>) => {
            state.form.gender = action.payload
        },
        handleCreateInvitingForm: (state, action: PayloadAction<{ key: keyof typeof initialState.form.text_fields, val: string }>) => {
            const key = action.payload.key
            const val = action.payload.val
            const tempCreatingForm: typeof initialState.form.text_fields = JSON.parse(JSON.stringify(state.form.text_fields))

            if (key === "dob") {
                //correcting dob
            }

            tempCreatingForm[key] = val
            state.form.text_fields = tempCreatingForm

            const datesAreValid = tempCreatingForm.dob.length === 10
            const allFieldsAreNotEmpty = Object.values(tempCreatingForm).every((val) => val.length > 0)
            const emailIsValid = EMAIL.test(tempCreatingForm["email"])

            state.form.disabled = !datesAreValid || !allFieldsAreNotEmpty || !emailIsValid
        },
        resetCreateInvitingForm: state => {
            state.form = initialState.form
        }
    },
    extraReducers: (builder) => {
        //Inviting CREATE
        builder.addCase(createInviting.pending, (state, action) => {
            state.form.sending = true
        })
        builder.addCase(createInviting.fulfilled, (state, action) => {
            state.form.sending = false
        })
        builder.addCase(createInviting.rejected, (state, action) => {
            state.form.err = "Не удалось создать профиль!"
            state.form.sending = false
        })
    },
})

export const {
    handleCreateInvitingForm,
    handleCreateInvitingGender,
    resetCreateInvitingForm,
} = InvitingSlice.actions


export const invitingReducer = InvitingSlice.reducer