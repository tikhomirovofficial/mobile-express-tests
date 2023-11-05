import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ModalsSliceState = {
    orderInfoModal: boolean
}

const initialState: ModalsSliceState = {
    orderInfoModal: false
}
export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleOrderInfoModal: (state) => {
            state.orderInfoModal = !state.orderInfoModal
        }
    }
})

export const {
    handleOrderInfoModal
} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer