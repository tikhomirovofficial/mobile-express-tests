import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PatientApi } from "../../../types/entities/patients.types";

type PatientOrderData = Pick<PatientApi, "id" | "first_name" | "last_name">

type OrderSliceState = {
    patientData: PatientOrderData
    currentCategorySelected: number,
    success: boolean,
    sending: boolean
}

const initialState: OrderSliceState = {
    success: false,
    sending: false,
    patientData: {
        id: -1,
        first_name: "",
        last_name: ""
    },
    currentCategorySelected: -1
}
// export const createOrder = createAsyncThunk(
//     'order/create',
//     async (req: InvitingCreateReq, { dispatch }) => {
//         const resp: InvitingCreateRes = { status: true }
//         if (!resp.status) {
//             throw new Error("Не удалось добавить пациента!")
//         }
//         return new Promise<InvitingCreateRes>((res, rej) => {
//             setTimeout(() => {
//                 res(resp)
//             }, 1000)
//         })
//     }
// )
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
            state.patientData = initialState.patientData
        }
    }
})
export const {
    setPatient,
    setCurrentCategory,
    resetPatient
} = OrderSlice.actions

export const orderReducer = OrderSlice.reducer