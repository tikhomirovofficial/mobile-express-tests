import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../../types/entities/user.types";
import { HasLoading } from "../../../types/common.types";
import { OrderApi } from "../../../types/entities/order.types";

type ProfileSliceState = {
    orders: OrderApi[],
    data: ProfileData,
    loadings: {
        profile: boolean
        orders: boolean
    }
}

const initialState: ProfileSliceState = {
    orders: [

    ],
    data: {
        first_name: "",
        last_name: "",
        subname: "",
        dob: "",
        image: "",
        bonus: 0
    },
    loadings: {
        profile: false,
        orders: false
    }
}

export const getProfile = createAsyncThunk(
    'profile/get',
    async (req, { dispatch }) => {
        return new Promise<ProfileData>((res, rej) => {
            setTimeout(() => {
                res({
                    first_name: "Борис",
                    last_name: "Борисов",
                    subname: "Борисович",
                    dob: "2000-11-11",
                    image: "/",
                    bonus: 3
                })
            }, 1000)
        })
    }
)

export const getAllOrders = createAsyncThunk(
    'profile/orders/get',
    async (req, { dispatch }) => {
        return new Promise<OrderApi[]>((res, rej) => {
            setTimeout(() => {
                res([{
                    id: 1,
                    status: "",
                    date: "2000-11-11",
                    bonus: 300
                }])
            }, 1000)
        })
    }
)

export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //PROFILE
        builder.addCase(getProfile.pending, (state, action) => {
            state.loadings.orders = true
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.data = action.payload
            state.loadings.orders = false
        })
        builder.addCase(getProfile.rejected, (state, action) => {
            state.loadings.orders = false
        })
        //PROFILE ORDERS
        builder.addCase(getAllOrders.pending, (state, action) => {
            state.loadings.orders = true
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.orders = action.payload
            state.loadings.orders = false
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loadings.orders = false
        })

    },
})

export const {

} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer