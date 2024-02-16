import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAcceptReq, AuthAcceptRes, AuthReq, AuthRes } from "../../../types/api/user.api.types";
import { deleteTokens, storeTokens } from "../../../utils/storeTokens";
import { checkIsValid } from "../../../utils/checkToken";
import { getHasProfile } from "../profile/profileSlice";

type LoginSliceType = {
    token: {
        valid: boolean,
        checking: boolean
    },
    auth: {
        loading: boolean,
        success: {
            phone: boolean | null
            code: boolean | null
        },
        code_options: {
            is_freezed: boolean
            freezed_sec: number
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
    token: {
        checking: true,
        valid: false
    },
    auth: {
        loading: false,
        success: {
            phone: null,
            code: null
        },
        code_options: {
            is_freezed: false,
            freezed_sec: 0
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
export const checkToken = createAsyncThunk(
    'login/token-check',
    async (_, { dispatch }) => {
        const isValidToken = await checkIsValid()

        if (!isValidToken) {
            throw isValidToken
        }
        return new Promise<boolean>((res, rej) => {
            res(isValidToken)
        })

    }
)
export const logout = createAsyncThunk(
    'logout',
    async (_, { dispatch }) => {
        await deleteTokens()
    }
)

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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDY4MjM3MTUsImV4cCI6MTczODM1OTcxNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.XIwgkYXEV4jr8ykkkPq196lsIDOw9V05lysW4DswROM"
export const sendAuthCode = createAsyncThunk(
    'login/code',
    async (req: AuthAcceptReq, { dispatch }) => {
        const resp: AuthAcceptRes = {
            refresh: token,
            access: "",
            status: true
        }
        if (!resp.status) {
            throw new Error("Некорректный код")
        }
        if (!resp?.refresh.length) {
            throw new Error("Невалидный токен пришёл")
        }
        await storeTokens({ refresh: resp.refresh, access: resp.access })

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
        setCodeIsFreezed: (state, action: PayloadAction<boolean>) => {
            state.auth.code_options.is_freezed = action.payload
        },
        setCodeFreezedSecs: (state, action: PayloadAction<number>) => {
            state.auth.code_options.freezed_sec = action.payload
        },
        resetLoginForm: (state) => {
            state.auth = initialState.auth
        },
        resetLoginCodeStatus: (state) => {
            state.auth.success.code = null
        },
        resetLoginPhoneStatus: (state) => {
            state.auth.success.phone = null
        },


    },
    extraReducers: (builder) => {
        //SEND PHONE IN LOGIN
        builder.addCase(sendAuthPhone.pending, (state, action) => {
            state.auth.loading = true
            state.auth.success.phone = null
            state.auth.errors.phone = ""
        })
        //SAVE TOKENS
        builder.addCase(sendAuthPhone.fulfilled, (state, action) => {
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
        //SAVE TOKENS
        builder.addCase(sendAuthCode.fulfilled, (state, action) => {
            state.auth.loading = false
            state.auth.success.code = true
            state.token.valid = true,
                state.auth.form = initialState.auth.form

        })
        builder.addCase(sendAuthCode.rejected, (state, action) => {
            state.auth.loading = false
            state.auth.success.code = false
            state.auth.errors.code = "Номер телефона плохой!"
            console.log("Плохо");
        })
        //CHECK TOKEN IS VALID
        builder.addCase(checkToken.pending, (state, action) => {
            state.token.checking = true
        })
        builder.addCase(checkToken.fulfilled, (state, action) => {
            state.token.checking = false
            state.token.valid = action.payload

        })
        builder.addCase(checkToken.rejected, (state, action) => {
            state.token.valid = false
            state.token.checking = false
        })
        //LOGOUT
        builder.addCase(logout.pending, (state, action) => {
            state.token.checking = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.token.valid = false
            state.token.checking = false
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.token.checking = false
        })
    },
})

export const {
    handleLoginForm,
    resetLoginForm,
    resetLoginCodeStatus,
    resetLoginPhoneStatus,
    setCodeFreezedSecs,
    setCodeIsFreezed
} = LoginSlice.actions


export const loginReducer = LoginSlice.reducer