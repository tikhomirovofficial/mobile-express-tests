import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ModalsSliceState = {
    orderInfoModal: boolean
    profileEditModal: boolean
}

const initialState: ModalsSliceState = {
    orderInfoModal: false,
    profileEditModal: false
}
export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleOrderInfoModal: (state) => {
            state.orderInfoModal = !state.orderInfoModal
        },
        handleProfileEditModal: (state) => {
            state.profileEditModal = !state.profileEditModal
        }
    }
})

export const {
    handleOrderInfoModal,
    handleProfileEditModal
} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer