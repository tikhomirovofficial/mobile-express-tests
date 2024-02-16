import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderApi } from "../../../types/entities/order.types";
import { GetAllOrdersReq, GetAllOrdersRes } from "../../../types/api/orders.api.types";
import { HasNextPart, HasPart } from "../../../types/common.types";


type OrdersSliceState = {
    loadings: {
        all_orders: boolean,
        all_orders_pagination: boolean
    }
    all_orders: OrderApi[];
} & HasNextPart & HasPart

const initialState: OrdersSliceState = {
    loadings: {
        all_orders: true,
        all_orders_pagination: false,
    },
    part: 0,
    can_next: false,
    all_orders: []
}
export const getAllOrders = createAsyncThunk(
    'all/orders/get',
    async (req: GetAllOrdersReq, { dispatch }) => {
        return new Promise<GetAllOrdersRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    can_next: false,
                    orders: [
                        {
                            id: 1,
                            status: "Создано",
                            date: "2024-01-22",
                            pacient: "Иван Иванов",
                            bonus: 1,
                        },
                        {
                            id: 2,
                            status: "Создано",
                            date: "2024-01-22",
                            pacient: "Иван Иванов",
                            bonus: 1,
                        },
                        {
                            id: 3,
                            status: "Создано",
                            date: "2024-01-22",
                            pacient: "Иван Иванов",
                            bonus: 1,
                        },
                        {
                            id: 4,
                            status: "Создано",
                            date: "2024-01-22",
                            pacient: "Иван Иванов",
                            bonus: 1,
                        }
                    ]
                })
            }, 1000)
        })
    }
)

export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrders: state => {
            state.all_orders = initialState.all_orders
            state.part = 0
        },
        incrementOrdersPart: state => {
            state.part += 1
        },
    },
    extraReducers: (builder) => {
        //USER ALL ORDERS
        builder.addCase(getAllOrders.pending, (state, action) => {
            if (state.part > 1) {
                state.loadings.all_orders_pagination = true
                return
            }
            state.loadings.all_orders = true
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.all_orders = [...state.all_orders, ...action.payload.orders]
            state.can_next = action.payload.can_next
            state.loadings.all_orders = false
            state.loadings.all_orders_pagination = false
            if (state.part === 0) {
                state.part = 1
            }
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loadings.all_orders = false
            state.loadings.all_orders_pagination = false
        })
    },
})
export const {
    resetOrders,
    incrementOrdersPart
} = OrdersSlice.actions
export const ordersReducer = OrdersSlice.reducer