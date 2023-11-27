import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Product = {
    id: number
    price: number,
    title: string,
    category_id: number
}
type ProductSliceState = {
    items: Product[];
}

const initialState: ProductSliceState = {
    items: [
        {
            category_id: 1,
            id: 1,
            price: 773,
            title: "Т3 свободный (П)"
        },
        {
            id: 2,
            category_id: 3,
            price: 400,
            title: "Индекс ROMA (включает исследования СА 125 и НЕ-4) (П)"
        },
        {
            id: 3,
            category_id: 2,
            price: 650,
            title: "ПСА общий (П)"
        }
    ]
}
export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    }
})

export const productsReducer = ProductsSlice.reducer