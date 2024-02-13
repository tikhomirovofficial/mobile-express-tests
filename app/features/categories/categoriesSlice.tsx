import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryApi } from "../../../types/entities/categories.types";
import { CategoriesGetReq, CategoriesGetRes } from "../../../types/api/categories.api.types";

type CategoriesSliceState = {
    loadings: {
        categories: boolean
    }
    items: CategoryApi[];
}

const initialState: CategoriesSliceState = {
    loadings: {
        categories: true
    },
    items: []
}
export const getCategories = createAsyncThunk(
    'all/categories/get',
    async (req: CategoriesGetReq, { dispatch }) => {
        return new Promise<CategoriesGetRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    category: [{
                        color: "#ffffff",
                        id: 3,
                        istake: false,
                        name: "Биохимические исследования крови",
                        take: 128
                    }]
                })
            }, 1000)
        })
    })
export const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.loadings.categories = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.items = action.payload.category
            state.loadings.categories = false
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            console.log(`Ошибка при получении категорий: ${action.error.message}`);
            
            state.loadings.categories = false
        })
    },
})

export const categoriesReducer = CategoriesSlice.reducer