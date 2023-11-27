import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type CartItem = {
    id: number
    price: number,
    count: number
}
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
            state.items = [
                ...state.items,
                action.payload
            ]
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        }
    }
})

export const {
    addToCart,
    removeProduct
} = CartSlice.actions


export const cartReducer = CartSlice.reducer