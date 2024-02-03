import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAcceptReq, AuthAcceptRes, AuthReq, AuthRes } from "../../../types/api/user.api.types";
import { storeTokens } from "../../../utils/storeTokens";
import { checkIsValid } from "../../../utils/checkToken";
import { checkIsAlreadyBeen } from "../../../utils/checkFirstTime";
import { checkPinExists } from "../../../utils/checkAccessed";
import { storeAlreadyBeen } from "../../../utils/storeFirstTime";
import { checkEnteredPin } from "../../../utils/checkEnteredPin";
import { deletePin, storePin } from "../../../utils/storePin";

type PermissionsSliceType = {
    notifications: {
        granted: boolean,
        checking: boolean
    },
    media: {
        granted: boolean,
        checking: boolean
    },
    contacts: {
        granted: boolean,
        checking: boolean
    },

}

const initialState: PermissionsSliceType = {
    notifications: {
        granted: false,
        checking: true
    },
    media: {
        granted: false,
        checking: true
    },
    contacts: {
        granted: false,
        checking: true
    },

}

export const checkNotificationsPerm = createAsyncThunk(
    'permissions/notifications/get',
    async (_, { dispatch }) => {
        const granted = await checkIsAlreadyBeen()
        if (!granted) {
            throw granted
        }
        return new Promise<boolean>((res, rej) => {
            res(true)
        })

    }
)
export const checkContactsPerm = createAsyncThunk(
    'permissions/contacts/get',
    async (_, { dispatch }) => {
        const granted = await checkIsAlreadyBeen()
        if (!granted) {
            throw granted
        }
        return new Promise<boolean>((res, rej) => {
            res(true)
        })

    }
)
export const checkMediaPerm = createAsyncThunk(
    'permissions/media/get',
    async (_, { dispatch }) => {
        const granted = await checkIsAlreadyBeen()
        if (!granted) {
            throw granted
        }
        return new Promise<boolean>((res, rej) => {
            res(true)
        })

    }
)

export const permissionsSlice = createSlice({
    name: "permissions",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //CHECK NOTIFICATIONS
        builder.addCase(checkNotificationsPerm.pending, (state, action) => {
            state.notifications.checking = true
        })
        builder.addCase(checkNotificationsPerm.fulfilled, (state, action) => {
            state.notifications.checking = false
            state.notifications.granted = action.payload
        })
        builder.addCase(checkNotificationsPerm.rejected, (state, action) => {
            state.notifications.checking = false
            state.notifications.granted = false
        })
        //CHECK CONTACTS
        builder.addCase(checkContactsPerm.pending, (state, action) => {
            state.contacts.checking = true
        })
        builder.addCase(checkContactsPerm.fulfilled, (state, action) => {
            state.contacts.checking = false
            state.contacts.granted = action.payload
        })
        builder.addCase(checkContactsPerm.rejected, (state, action) => {
            state.contacts.checking = false
            state.contacts.granted = false
        })
        //CHECK MEDIA
        builder.addCase(checkMediaPerm.pending, (state, action) => {
            state.media.checking = true
        })
        builder.addCase(checkMediaPerm.fulfilled, (state, action) => {
            state.media.checking = false
            state.media.granted = action.payload
        })
        builder.addCase(checkMediaPerm.rejected, (state, action) => {
            state.media.checking = false
            state.media.granted = false
        })
    },
})

export const {

} = permissionsSlice.actions


export const permissionsReducer = permissionsSlice.reducer