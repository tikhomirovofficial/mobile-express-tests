import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AnalysisApi } from "../../../types/entities/analysis.types";

export type CartItemType = Pick<AnalysisApi, "id" | "name" | "cost">

type CartSliceState = {
    items: CartItemType[]
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
        addToCart: (state, action: PayloadAction<CartItemType>) => {
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