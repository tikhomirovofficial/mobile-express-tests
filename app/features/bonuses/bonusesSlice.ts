import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BonusesDiagramGetRes } from "../../../types/api/finances.api.types";
import { BonusesApi } from "../../../http/api/bonuses.api";
import { AxiosResponse } from "axios";
import { handleTokenRefreshedRequest } from "../../../utils/handleThunkAuth";

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
        // const res: AxiosResponse<BonusesDiagramGetRes> = await handleTokenRefreshedRequest(BonusesApi.GetDiagram)
        // console.log(res.data);
        // return res.data
        return new Promise<BonusesDiagramGetRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    bonuses: {
                        "Янв": 0,
                        "Фев": 0,
                        "Мар": 0,
                        "Апр": 0,
                        "Май": 0,
                        "Июн": 0,
                        "Июл": 0,
                        "Авг": 0,
                        "Сен": 0,
                        "Окт": 0,
                        "Ноя": 0,
                        "Дек": 0,
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