import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Order = {
    id: number
    title: string
    date: string,
    patientFirstName: string,
    patientLastName: string,
    isPaid: false
}
type OrdersSliceState = {
    items: Order[];
}

const initialState: OrdersSliceState = {
    items: [
        
    ]
}
export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<Order>) {
            state.items = [...state.items, action.payload]
        }
    }
})
export const {
     addOrder
} = OrdersSlice.actions
export const ordersReducer = OrdersSlice.reducer