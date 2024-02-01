import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAcceptReq, AuthAcceptRes, AuthReq, AuthRes } from "../../../types/api/user.api.types";

type LoginSliceType = {
    auth: {
        loading: boolean,
        success: {
            phone: boolean | null
            code: boolean | null
        },
        form: {
            maskedPhone: string
            phone: string
            password: string
        },
        errors: {
            phone: string
            code: string
        }
    }
}

const initialState: LoginSliceType = {
    auth: {
        loading: false,
        success: {
            phone: null,
            code: null
        },
        form: {
            maskedPhone: "+7",
            phone: "",
            password: ""
        },
        errors: {
            phone: "",
            code: ""
        }
    }
}

export const sendAuthPhone = createAsyncThunk(
    'login/phone',
    async (req: AuthReq, { dispatch }) => {
        const resp: AuthRes = {
            status: true
        }
        if (!resp.status) {
            throw new Error("Нет номера телеофна")
        }
        return new Promise<AuthRes>((res, rej) => {

            setTimeout(() => {

                res(resp)
            }, 1000)
        })
    }
)
export const sendAuthCode = createAsyncThunk(
    'login/code',
    async (req: AuthAcceptReq, { dispatch }) => {
        const resp: AuthAcceptRes = {
            refresh: "",
            access: "",
            status: false
        }
        if (!resp.status) {
            throw new Error("Некорректный код")
        }
        return new Promise<AuthRes>((res, rej) => {
            setTimeout(() => {
                res(resp)
            }, 1000)
        })
    }
)

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        handleLoginForm: (state, action: PayloadAction<{ key: keyof typeof initialState.auth.form, val: string }>) => {
            state.auth.form[action.payload.key] = action.payload.val
        },
        resetLoginForm: (state) => {
            state.auth = initialState.auth
        }

    },
    extraReducers: (builder) => {
        //SEND PHONE IN LOGIN
        builder.addCase(sendAuthPhone.pending, (state, action) => {
            state.auth.loading = true
            state.auth.success.phone = null
            state.auth.errors.phone = ""
        })
        builder.addCase(sendAuthPhone.fulfilled, (state, action) => {
            //SAVE TOKENS
            state.auth.loading = false
            state.auth.success.phone = true
            console.log("Успех");

        })
        builder.addCase(sendAuthPhone.rejected, (state, action) => {
            state.auth.loading = false
            state.auth.success.phone = false
            state.auth.errors.phone = "Номер телефона плохой!"
            console.log("Плохо");
        })
        //SEND CODE IN LOGIN
        builder.addCase(sendAuthCode.pending, (state, action) => {
            state.auth.loading = true
            state.auth.success.code = null
            state.auth.errors.code = ""
        })
        builder.addCase(sendAuthCode.fulfilled, (state, action) => {
            //SAVE TOKENS
            state.auth.loading = false
            state.auth.success.code = true
            console.log("Успех");

        })
        builder.addCase(sendAuthCode.rejected, (state, action) => {
            state.auth.loading = false
            state.auth.success.code = false
            state.auth.errors.code = "Номер телефона плохой!"
            console.log("Плохо");
        })

    },
})

export const {
    handleLoginForm,
    resetLoginForm
} = LoginSlice.actions


export const loginReducer = LoginSlice.reducer