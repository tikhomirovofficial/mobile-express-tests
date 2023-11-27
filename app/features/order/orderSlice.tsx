import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PatientOrderData = {
    id: string,
    firstName: string,
    lastName: string
}
type OrderSliceState = {
    patientData: PatientOrderData
    currentCategorySelected: number
}

const initialState: OrderSliceState = {
    patientData: {
        id: "-1",
        firstName: "",
        lastName: ""
    },
    currentCategorySelected: -1
}
export const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setPatient(state, action: PayloadAction<PatientOrderData>) {
            state.patientData = action.payload
        },
        setCurrentCategory(state, action: PayloadAction<number>) {
            state.currentCategorySelected = action.payload
        },
        resetPatient(state) {
            state.patientData = {
                id: "-1",
                firstName: "",
                lastName: ""
            }
        }
    }
})
export const {
    setPatient,
    setCurrentCategory,
    resetPatient
} = OrderSlice.actions

export const orderReducer = OrderSlice.reducer