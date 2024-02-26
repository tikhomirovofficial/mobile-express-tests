import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryApi } from "../../../types/entities/categories.types";
import { CategoriesGetReq, CategoriesGetRes } from "../../../types/api/categories.api.types";
import { CategoriesApi } from "../../../http/api/categories.api";
import { AxiosResponse } from "axios";
import { handleTokenRefreshedRequest } from "../../../utils/handleThunkAuth";
import { HasNextPart, HasPart } from "../../../types/common.types";
import { AnalysisApi } from "../../../types/entities/analysis.types";

type CategoriesSliceState = {
    loadings: {
        categories: boolean
        pagination: boolean,
    }
    categories: CategoryApi[]
    analisys: AnalysisApi[]
} & HasNextPart & HasPart

const initialState: CategoriesSliceState = {
    loadings: {
        categories: true,
        pagination: false
    },
    categories: [],
    analisys: [],
    can_next: false,
    part: 0
}

export const getCategories = createAsyncThunk(
    'all/categories/get',
    async (req: CategoriesGetReq, { dispatch }) => {
        const res: AxiosResponse<CategoriesGetRes> = await handleTokenRefreshedRequest(CategoriesApi.GetByTitle, req)
        console.log(res.data);
        return res.data
        // return new Promise<CategoriesGetRes>((res, rej) => {
        //     setTimeout(() => {
        //         res({
        //             status: true,
        //             category: [{
        //                 color: "#ffffff",
        //                 id: 3,
        //                 istake: false,
        //                 name: "Биохимические исследования крови",
        //                 take: 128
        //             }]
        //         })
        //     }, 1000)
        // })
    })

export const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        resetCategoriesProducts: state => {
            state.analisys = initialState.analisys
            state.categories = initialState.categories
            state.can_next = false
            state.part = 0
        },
        incrementCategoriesProductsPart: state => {
            state.part += 1
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            if (state.part > 1) {
                state.loadings.pagination = true
                return
            }
            state.loadings.categories = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.analisys = [...state.analisys, ...action.payload.analisis]
            state.categories = action.payload.category
            state.loadings.categories = false
            state.can_next = action.payload.can_next
            state.loadings.pagination = false
            if (state.part === 0) {
                state.part = 1
            }
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            console.log(`Ошибка при получении категорий: ${action.error.message}`);
            state.loadings.categories = false
            state.loadings.pagination = false
        })
    },
})
export const {
    incrementCategoriesProductsPart,
    resetCategoriesProducts,
} = CategoriesSlice.actions

export const categoriesReducer = CategoriesSlice.reducer