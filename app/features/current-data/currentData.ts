import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../../types/entities/user.types";
import { HasLoading } from "../../../types/common.types";
import { OrderApi, OrderDetailsApi } from "../../../types/entities/order.types";

type CurrentData = {
    loadings: {
        order: boolean
    },
    orderInfo: OrderDetailsApi
}

const initialState: CurrentData = {
    loadings: {
        order: false
    },
    orderInfo: {
        info_order: {
            doctor: "",
            pacient: "",
            status: "",
            date: "0000-00-00",
            order_id: 0
        },
        results: [],
        analiz_list: [
            {
                id: 0,
                title: ""
            }
        ]
    }
}

export const getOrderById = createAsyncThunk(
    'order/get',
    async (id: number, { dispatch }) => {
        return new Promise<OrderDetailsApi>((res, rej) => {
            setTimeout(() => {
                res({
                    info_order: {
                        doctor: "Подосёнов",
                        pacient: "Тузов",
                        status: "Отправлен",
                        date: "2023-01-22",
                        order_id: 1
                    },
                    results: [],
                    analiz_list: [
                        {
                            id: 1,
                            title: "Анализ 1"
                        }
                    ]
                })
            }, 1000)
        })
    }
)

export const CurrentDataSlice = createSlice({
    name: "current-data",
    initialState,
    reducers: {
        resetOrderInfo: (state) => {
            state.orderInfo = initialState.orderInfo
        }
    },
    extraReducers: (builder) => {
        //ORDER BY ID
        builder.addCase(getOrderById.pending, (state, action) => {
            state.loadings.order = true
        })
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.orderInfo = action.payload
            state.loadings.order = false
        })
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loadings.order = false
        })

    },
})

export const {
    resetOrderInfo
} = CurrentDataSlice.actions


export const currentDataReducer = CurrentDataSlice.reducer