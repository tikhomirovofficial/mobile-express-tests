import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../../types/entities/user.types";
import { HasLoading } from "../../../types/common.types";
import { OrderApi, OrderDetailsApi } from "../../../types/entities/order.types";
import { PatientDoctorGetRes } from "../../../types/api/patients.api.types";
import { PatientApi } from "../../../types/entities/patients.types";

type BonusesSliceData = {
    loadings: {
        chart: boolean
    },
    chartData: any
}

const initialState: BonusesSliceData = {
    loadings: {
        chart: true
    },
    chartData: {}
}

export const getChartBonusesData = createAsyncThunk(
    'bonuses/chart/get',
    async (_, { dispatch }) => {
        return new Promise<any>((res, rej) => {
            setTimeout(() => {
                res({
                    data: {}
                })
            }, 1000)
        })
    }
)

export const BonusesSlice = createSlice({
    name: "bonuses",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //GET BONUSES PER EVERY MONTH
        builder.addCase(getChartBonusesData.pending, (state, action) => {
            state.loadings.chart = true
        })
        builder.addCase(getChartBonusesData.fulfilled, (state, action) => {
            state.chartData = action.payload
            state.loadings.chart = false
        })
        builder.addCase(getChartBonusesData.rejected, (state, action) => {
            state.loadings.chart = false
        })

    },
})

export const {

} = BonusesSlice.actions


export const bonusesReducer = BonusesSlice.reducer