import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderApi } from "../../../types/entities/order.types";
import { GetAllOrdersReq, GetAllOrdersRes } from "../../../types/api/orders.api.types";
import { HasNextPart } from "../../../types/common.types";


type OrdersSliceState = {
    loadings: {
        all_orders: boolean
    }
    all_orders: OrderApi[];
} & HasNextPart

const initialState: OrdersSliceState = {
    loadings: {
        all_orders: true,
    },
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
                    can_next: true,
                    orders: [{
                        id: 1,
                        status: "Создано",
                        date: "2024-01-22",
                        pacient: "Иван Иванов",
                        bonus: 1,
                    }]
                })
            }, 1000)
        })
    }
)

export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //USER ALL ORDERS
        builder.addCase(getAllOrders.pending, (state, action) => {
            state.loadings.all_orders = true
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.all_orders = action.payload.orders
            state.can_next = action.payload.can_next
            state.loadings.all_orders = false
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loadings.all_orders = false
        })
    },
})
export const {

} = OrdersSlice.actions
export const ordersReducer = OrdersSlice.reducer