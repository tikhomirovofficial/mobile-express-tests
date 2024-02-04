import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderApi } from "../../../types/entities/order.types";
import { GetAllOrdersRes } from "../../../types/api/orders.api.types";


type OrdersSliceState = {
    loadings: {
        all_orders: boolean
    }
    all_orders: OrderApi[];
}

const initialState: OrdersSliceState = {
    loadings: {
        all_orders: true,
    },
    all_orders: []
}
export const getAllOrders = createAsyncThunk(
    'all/orders/get',
    async (req, { dispatch }) => {
        return new Promise<GetAllOrdersRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
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