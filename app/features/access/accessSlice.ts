import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAcceptReq, AuthAcceptRes, AuthReq, AuthRes } from "../../../types/api/user.api.types";
import { storeTokens } from "../../../utils/storeTokens";
import { checkIsValid } from "../../../utils/checkToken";
import { checkIsAlreadyBeen } from "../../../utils/checkFirstTime";
import { checkPinExists } from "../../../utils/checkAccessed";
import { storeAlreadyBeen } from "../../../utils/storeFirstTime";
import { checkEnteredPin } from "../../../utils/checkEnteredPin";
import { deletePin, storePin } from "../../../utils/storePin";
import { vibrate } from "../../../utils/device/vibrate";

type AcecssSliceType = {
    bio: {
        hard_used: boolean
        checking: boolean,
        registered: number
    }
    faceId: {
        connected: boolean,
        asked: boolean,
        checking: boolean
    }
    alreadyBeen: {
        valid: boolean,
        checking: boolean
    },
    pin: {
        exists: boolean,
        checking: boolean
    },
    accepted: {
        error: string,
        valid: boolean,
        checking: boolean
    },

}

const initialState: AcecssSliceType = {
    bio: {
        hard_used: false,
        checking: true,
        registered: 0
    },
    faceId: {
        connected: true,
        asked: false,
        checking: true,
    },
    alreadyBeen: {
        checking: true,
        valid: false
    },
    accepted: {
        error: "",
        checking: true,
        valid: false
    },
    pin: {
        exists: false,
        checking: true
    },

}

export const checkFirstTime = createAsyncThunk(
    'access/is-first-time',
    async (_, { dispatch }) => {
        const alreadyBeen = await checkIsAlreadyBeen()
        if (!alreadyBeen) {
            await storeAlreadyBeen(true)
            throw alreadyBeen
        }
        return new Promise<boolean>((res, rej) => {
            res(true)
        })

    }
)
export const checkPinCodeExists = createAsyncThunk(
    'access/pin-exists',
    async (_, { dispatch }) => {
        const isExists = await checkPinExists()
        if (!isExists) {
            throw isExists
        }
        return new Promise<boolean>((res, rej) => {
            res(isExists)
        })

    }
)
export const setPinCode = createAsyncThunk(
    'access/pin/create',
    async (pinString: string, { dispatch }) => {
        try {
            await storePin(pinString)
        } catch (error) {
            throw Error("Ошибка при создании пин-кода")
        }

    }
)

export const checkValidEnteredPin = createAsyncThunk(
    'access/pin/entered',
    async (entered_pin: string, { dispatch }) => {
        const isEntered = await checkEnteredPin(entered_pin)
        //const isEntered = true
        if (!isEntered) {
            vibrate(200)
            throw isEntered
        }
        //Выполним отделную функцию для проверки заполненности профиля
        return new Promise<boolean>((res, rej) => {
            res(isEntered)
        })

    }
)

export const accessSlice = createSlice({
    name: "access",
    initialState,
    reducers: {
        setFaceIdAsked: (state, action: PayloadAction<boolean>) => {
            state.faceId.asked = action.payload
        },
        resetAcceptedErr: (state) => {
            state.accepted.error = ""
        },
        resetAccess: state => {
            state.accepted.valid = false
        }
    },
    extraReducers: (builder) => {
        //CHECK FIRST TIME
        builder.addCase(checkFirstTime.pending, (state, action) => {
            state.alreadyBeen.checking = true
        })
        builder.addCase(checkFirstTime.fulfilled, (state, action) => {
            state.alreadyBeen.checking = false
            state.alreadyBeen.valid = action.payload
        })
        builder.addCase(checkFirstTime.rejected, (state, action) => {
            state.alreadyBeen.valid = false
            state.alreadyBeen.checking = false
        })
        //CHECK PIN EXISTS
        builder.addCase(checkPinCodeExists.pending, (state, action) => {
            state.pin.exists = true
            state.pin.checking = true
        })
        builder.addCase(checkPinCodeExists.fulfilled, (state, action) => {
            state.pin.checking = false
            state.pin.exists = action.payload
        })
        builder.addCase(checkPinCodeExists.rejected, (state, action) => {
            state.pin.checking = false
            state.pin.exists = false
        })
        //CHECK ACCEPTED
        builder.addCase(checkValidEnteredPin.pending, (state, action) => {
            state.accepted.error = ""
        })
        builder.addCase(checkValidEnteredPin.fulfilled, (state, action) => {
            state.accepted.checking = false
            state.accepted.valid = action.payload
        })
        builder.addCase(checkValidEnteredPin.rejected, (state, action) => {
            state.accepted.valid = false
            state.accepted.checking = false
            state.accepted.error = "Неверный код"
        })
        //SETTING PIN-CODE
        builder.addCase(setPinCode.fulfilled, (state, action) => {
            state.pin.exists = true
            state.accepted.valid = true
        })
    },
})

export const {
    resetAcceptedErr,
    resetAccess,
    setFaceIdAsked,
} = accessSlice.actions


export const accessReducer = accessSlice.reducer