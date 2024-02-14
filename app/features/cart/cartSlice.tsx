import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AnalysisApi } from "../../../types/entities/analysis.types";

export type CartItem = Pick<AnalysisApi, "id" | "name" | "cost">

type CartSliceState = {
    items: CartItem[]
    totalPrice: number
}

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0
}
export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            console.log(action.payload.name);
            
            state.items = [
                ...state.items,
                action.payload
            ]
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})

export const {
    addToCart,
    removeProduct,
    clearCart
} = CartSlice.actions


export const cartReducer = CartSlice.reducer