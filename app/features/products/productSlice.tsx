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
            category_id: 1,
            id: 12,
            price: 773,
            title: "ФСГ (фолликулостимулирующий гормон) (П)"
        },
        {
            id: 1001,
            category_id: 3,
            price: 400,
            title: "Индекс ROMA (включает исследования СА 125 и НЕ-4) (П)"
        },
        {
            id: 151,
            category_id: 3,
            price: 420,
            title: "ТТГ (тиреотропный гормон) (П)"
        },
        {
            id: 3,
            category_id: 2,
            price: 650,
            title: "ПСА общий (П)"
        },
        {
            id: 19,
            category_id: 2,
            price: 750,
            title: "Альфафетопротеин (П)"
        },
        {
            id: 51,
            category_id: 2,
            price: 690,
            title: "Тестостерон общий (П)"
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