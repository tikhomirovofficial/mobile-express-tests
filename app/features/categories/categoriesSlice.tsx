import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Category = {
    id: number
    title: string
}
type CategoriesSliceState = {
    items: Category[];
}

const initialState: CategoriesSliceState = {
    items: [
        {
            id: 1,
            title: "Категория первая"
        },
        {
            id: 2,
            title: "Категория вторая"
        },
        {
            id: 3,
            title: "Категория третья"
        }
    ]
}
export const CategoriesSlice = createSlice({
    name: "Categories",
    initialState,
    reducers: {
        
    }
})

export const categoriesReducer = CategoriesSlice.reducer