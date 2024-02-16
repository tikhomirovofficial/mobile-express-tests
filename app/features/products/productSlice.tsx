import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalysisApi } from "../../../types/entities/analysis.types";
import { AnalysisGetReq, AnalysisGetRes } from "../../../types/api/analysis.api.types";

type ProductSliceState = {
    loadings: {
        products: boolean,
        pagination: boolean,
    }
    items: AnalysisApi[];
    can_next: boolean
    part: number
}

const initialState: ProductSliceState = {
    loadings: {
        products: true,
        pagination: false,
    },
    items: [],
    can_next: false,
    part: 0
}
export const getProducts = createAsyncThunk(
    'all/products/get',
    async (req: AnalysisGetReq, { dispatch }) => {
        return new Promise<AnalysisGetRes>((res, rej) => {
            setTimeout(() => {
                res({
                    can_next: true,
                    status: true,
                    analiz: Array(10).fill("").map((item, index) => {
                        return {
                            id: index,
                            cat: 1,
                            code: "",
                            cost: 300,
                            info: "dfdsf",
                            maxdur: 1,
                            mindur: 10,
                            name: "Какой-то анализ" + " " + index,
                            prepare: [],
                            tags: [],
                            templates: []
                        }
                    })
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
            state.part = 0
        },
        incrementProductsPart: state => {
            state.part += 1
        },
        resetPart: state => {
            state.part = 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, state => {
            if (state.part > 1) {
                state.loadings.pagination = true
                return
            }
            state.loadings.products = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload.analiz]
            state.can_next = action.payload.can_next
            state.loadings.pagination = false
            state.loadings.products = false
            if (state.part === 0) {
                state.part = 1
            }
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            console.log(`Ошибка при получении продуктов: ${action.error.message}`);
            state.loadings.pagination = false
            state.loadings.products = false
        })
    },
})
export const {
    resetProducts,
    resetPart,
    incrementProductsPart
} = ProductsSlice.actions
export const productsReducer = ProductsSlice.reducer