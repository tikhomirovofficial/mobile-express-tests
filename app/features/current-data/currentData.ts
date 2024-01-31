import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../../types/entities/user.types";
import { HasLoading } from "../../../types/common.types";
import { OrderApi, OrderDetailsApi } from "../../../types/entities/order.types";
import { PatientDoctorGetRes } from "../../../types/api/patients.api.types";
import { PatientApi } from "../../../types/entities/patients.types";

type CurrentData = {
    loadings: {
        order: boolean,
        patient_orders: boolean
    },
    orderInfo: OrderDetailsApi,
    patientInfo: {
        data: Pick<PatientApi, "first_name" | "last_name" | "id" | "bonus">,
        orders: OrderApi[]
    }
}

const initialState: CurrentData = {
    loadings: {
        order: true,
        patient_orders: true
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
    },
    patientInfo: {
        data: {
            id: 0,
            first_name: "",
            last_name: "",
            bonus: 0
        },
        orders: []
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
export const getOrdersByPatientId = createAsyncThunk(
    'patient/orders/get',
    async (id: number, { dispatch }) => {
        return new Promise<OrderApi[]>((res, rej) => {
            setTimeout(() => {
                res([
                    {
                        id: 1,
                        date: "2023-07-25",
                        status: "Зачислено",
                        bonus: 500
                    }
                ])
            }, 1000)
        })
    }
)

export const CurrentDataSlice = createSlice({
    name: "current-data",
    initialState,
    reducers: {
        setPatientData: (state, action: PayloadAction<PatientApi>) => {
            state.patientInfo.data = action.payload
        },
        resetOrderInfo: (state) => {
            state.orderInfo = initialState.orderInfo
        },
        resetPatientInfo: (state) => {
            state.patientInfo = initialState.patientInfo
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
        //ORDERS BY PATIENT ID
        builder.addCase(getOrdersByPatientId.pending, (state, action) => {
            state.loadings.patient_orders = true
        })
        builder.addCase(getOrdersByPatientId.fulfilled, (state, action) => {
            state.patientInfo.orders = action.payload
            state.loadings.patient_orders = false
        })
        builder.addCase(getOrdersByPatientId.rejected, (state, action) => {
            state.loadings.patient_orders = false
        })

    },
})

export const {
    resetOrderInfo,
    setPatientData,
    resetPatientInfo
} = CurrentDataSlice.actions


export const currentDataReducer = CurrentDataSlice.reducer