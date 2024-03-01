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
import * as LocalAuthentication from 'expo-local-authentication'

type AcecssSliceType = {
    bio: {
        device_compatible: boolean
        device_supported_types: number[] | null
        device_saved: boolean
        checking: boolean,
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
        sending: boolean
    },

}

const initialState: AcecssSliceType = {
    bio: {
        device_compatible: false,
        device_supported_types: null,
        device_saved: false,
        checking: true,
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
        valid: false,
        sending: false
    },
    pin: {
        exists: false,
        checking: true
    },

}

export const checkBioSupportedOnDevice = createAsyncThunk(
    'bio/supporting',
    async (_, { dispatch }) => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()
        const savedAuth = await LocalAuthentication.isEnrolledAsync()

        const initResults: Omit<typeof initialState.bio, "checking"> = {
            device_compatible: compatible,
            device_saved: savedAuth,
            device_supported_types: supportedTypes
        }
        console.log(initResults);

        return new Promise<typeof initResults>((res, rej) => {
            res(initResults)
        })

    }
)
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
export const checkBioEntered = createAsyncThunk(
    'access/bio/entered',
    async (bio_type: number, { dispatch }) => {
        //Проветить тип поддерживаемого распознания
        let promptMessage = ""
        if (bio_type === 1) {
            promptMessage = "Вход по отпечатку пальца"
        } else if (bio_type === 2) {
            promptMessage = "Вход по распознанию лица"
        }
        const { success } = await LocalAuthentication.authenticateAsync({
            promptMessage
        })
        console.log("sas");
        
        if (!success) {
            throw success
        }
        //Выполним отделную функцию для проверки заполненности профиля
        return new Promise<boolean>((res, rej) => {
            res(success)
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
        //CHECK SUPPORTING BIO LOCAL AUTH
        builder.addCase(checkBioSupportedOnDevice.pending, (state, action) => {
            state.bio.checking = true
        })
        builder.addCase(checkBioSupportedOnDevice.fulfilled, (state, action) => {
            state.bio = {
                checking: false,
                ...action.payload
            }
        })
        builder.addCase(checkBioSupportedOnDevice.rejected, (state, action) => {
            state.bio.checking = false
        })
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
            state.accepted.sending = true
        })
        builder.addCase(checkValidEnteredPin.fulfilled, (state, action) => {
            state.accepted.checking = false
            state.accepted.valid = action.payload
            state.accepted.sending = false
        })
        builder.addCase(checkValidEnteredPin.rejected, (state, action) => {
            state.accepted.valid = false
            state.accepted.checking = false
            state.accepted.error = "Неверный код"
            state.accepted.sending = false
        })
        //CHECK ACCEPTED BY TOUCH OR FACE
        builder.addCase(checkBioEntered.pending, (state, action) => {
            state.accepted.error = ""
        })
        builder.addCase(checkBioEntered.fulfilled, (state, action) => {
            state.accepted.checking = false
            state.accepted.valid = action.payload
            state.accepted.sending = false
        })
        builder.addCase(checkBioEntered.rejected, (state, action) => {
            state.accepted.valid = false
            state.accepted.sending = false
            state.accepted.checking = false
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