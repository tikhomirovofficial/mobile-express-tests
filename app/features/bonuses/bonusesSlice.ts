import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../../types/entities/user.types";
import { HasLoading } from "../../../types/common.types";
import { OrderApi, OrderDetailsApi } from "../../../types/entities/order.types";
import { PatientDoctorGetRes } from "../../../types/api/patients.api.types";
import { PatientApi } from "../../../types/entities/patients.types";
import { BonusesDiagramGetRes } from "../../../types/api/finances.api.types";

type BonusesSliceData = {
    loadings: {
        chart: boolean
    },
    chartData: {
        labels: string[]
        datasets: [
            {
                data: number[]
            }
        ]
    }
}

const initialState: BonusesSliceData = {
    loadings: {
        chart: true
    },
    chartData: {
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    }
}

export const getChartBonusesData = createAsyncThunk(
    'bonuses/chart/get',
    async (_, { dispatch }) => {
        return new Promise<BonusesDiagramGetRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    bonuses: {
                        "20.04.2022": 300,
                        "20.04.2023": 300,
                        "20.04.2024": 300,
                    },
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
            const months = Object.keys(action.payload.bonuses)
            const bonuses_values = Object.values(action.payload.bonuses)

            state.chartData.labels = months
            state.chartData.datasets[0].data = bonuses_values
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