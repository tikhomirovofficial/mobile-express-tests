import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderApi } from "../../../types/entities/order.types";
import { GetAllOrdersReq, GetAllOrdersRes } from "../../../types/api/orders.api.types";
import { HasNextPart, HasPart } from "../../../types/common.types";
import { AxiosResponse } from "axios";
import { OrdersApi } from "../../../http/api/orders.api";
import { handleTokenRefreshedRequest } from "../../../utils/handleThunkAuth";
import { UserApi } from "../../../http/api/user.api";


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
        const preparedReq: GetAllOrdersReq = {
            part: req.part || 1
        }
        const res: AxiosResponse<GetAllOrdersRes> = await handleTokenRefreshedRequest(OrdersApi.GetAll, preparedReq)
        console.log(res.data);
        return res.data
    }
)

export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrders: state => {
            state.part = initialState.part
            state.loadings = initialState.loadings
            state.all_orders = initialState.all_orders
            state.part = initialState.part
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
            state.all_orders = state.part ? [...state.all_orders, ...action.payload.orders] : action.payload.orders
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