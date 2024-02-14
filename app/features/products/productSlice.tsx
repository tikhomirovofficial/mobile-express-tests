import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalysisApi } from "../../../types/entities/analysis.types";
import { AnalysisGetReq, AnalysisGetRes } from "../../../types/api/analysis.api.types";

type ProductSliceState = {
    loadings: {
        products: boolean
    }
    items: AnalysisApi[];
    part: number
}

const initialState: ProductSliceState = {
    loadings: {
        products: true,
    },
    items: [],
    part: 1
}
export const getProducts = createAsyncThunk(
    'all/products/get',
    async (req: AnalysisGetReq, { dispatch }) => {
        return new Promise<AnalysisGetRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    analiz: [
                        {
                            id: 1,
                            cat: 1,
                            code: "",
                            cost: 300,
                            info: "dfdsf",
                            maxdur: 1,
                            mindur: 10,
                            name: "Какой-то анализ",
                            prepare: [],
                            tags: [],
                            templates: []
                        }
                    ]
                })
            }, 1000)
        })
    })
export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetProducts: state => {
            state.items = initialState.items
            state.loadings = initialState.loadings,
                state.part = initialState.part
        },
        incrementProductsPart: state => {
            state.part += 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, state => {
            state.loadings.products = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload.analiz]
            state.loadings.products = false
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            console.log(`Ошибка при получении продуктов: ${action.error.message}`);
            state.loadings.products = false
        })
    },
})
export const {
    resetProducts,
    incrementProductsPart
} = ProductsSlice.actions
export const productsReducer = ProductsSlice.reducer