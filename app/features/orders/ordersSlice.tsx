import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderApi, OrderByDateApi } from "../../../types/entities/order.types";
import { GetAllFinancesOrdersReq, GetAllFinancesOrdersRes, GetAllOrdersReq, GetAllOrdersRes } from "../../../types/api/orders.api.types";
import { HasNextPart, HasPart } from "../../../types/common.types";
import { AxiosResponse } from "axios";
import { OrdersApi } from "../../../http/api/orders.api";
import { handleTokenRefreshedRequest } from "../../../utils/handleThunkAuth";
import { UserApi } from "../../../http/api/user.api";


type OrdersSliceState = {
    loadings: {
        all_orders: boolean,
        all_orders_pagination: boolean,
        all_dated_orders: boolean,
        all_dated_orders_pagination: boolean
    }
    dated_part: number,
    dated_can_next: boolean,
    all_orders: OrderApi[];
    all_dated_orders: OrderByDateApi[];
} & HasNextPart & HasPart

const initialState: OrdersSliceState = {
    loadings: {
        all_orders: true,
        all_orders_pagination: false,
        all_dated_orders: true,
        all_dated_orders_pagination: false,
    },
    dated_part: 0,
    dated_can_next: false,
    part: 0,
    can_next: false,
    all_orders: [],
    all_dated_orders: []
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
export const getAllDatedOrders = createAsyncThunk(
    'all/orders/chrono/get',
    async (req: GetAllFinancesOrdersReq, { dispatch }) => {
        // const preparedReq: GetAllFinancesOrdersReq = {
        //     part: req.part || 1
        // }
        // const res: AxiosResponse<GetAllFinancesOrdersRes> = await handleTokenRefreshedRequest(OrdersApi.GetAllChrono, preparedReq)

        // return res.data
        return new Promise<GetAllFinancesOrdersRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    can_next: true,
                    total_bonus: 400,
                    orders: [
                        // {
                        //     date: "2024-10-12",
                        //     orders: [
                        //         {
                        //             id: 123,
                        //             date: "2024-10-12",
                        //             bonus: 100,
                        //             status: "Ожидание",
                        //             pacient: "Тузов Владислав",

                        //         }
                        //     ]
                        // }
                    ],
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
            state.loadings = initialState.loadings
            state.all_orders = initialState.all_orders
            state.part = initialState.part
        },
        incrementOrdersPart: state => {
            state.part += 1
        },
        resetDatedOrders: state => {
            state.loadings = initialState.loadings
            state.all_dated_orders = initialState.all_dated_orders
            state.dated_part = initialState.dated_part
        },
        incrementDatedOrdersPart: state => {
            state.dated_part += 1
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
            console.log(action.payload.orders);
            console.log(action.payload.can_next);
            
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
        //USER CHRONO ALL ORDERS
        builder.addCase(getAllDatedOrders.pending, (state, action) => {
            if (state.dated_part > 1) {
                state.loadings.all_dated_orders_pagination = true
                return
            }
            state.loadings.all_dated_orders = true
        })
        builder.addCase(getAllDatedOrders.fulfilled, (state, action) => {
            state.all_dated_orders = state.dated_part ? [...state.all_dated_orders, ...action.payload.orders] : action.payload.orders
            state.dated_can_next = action.payload.can_next
            console.log("dated ", action.payload.orders);

            state.loadings.all_dated_orders = false
            state.loadings.all_dated_orders_pagination = false
            if (state.dated_part === 0) {
                state.dated_part = 1
            }
        })
        builder.addCase(getAllDatedOrders.rejected, (state, action) => {
            state.loadings.all_dated_orders = false
            state.loadings.all_dated_orders_pagination = false
        })
    },
})
export const {
    resetOrders,
    incrementOrdersPart,
    incrementDatedOrdersPart,
    resetDatedOrders,
} = OrdersSlice.actions
export const ordersReducer = OrdersSlice.reducer