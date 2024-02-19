import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../../types/entities/user.types";
import { HasLoading } from "../../../types/common.types";
import { OrderApi, OrderDetailsApi } from "../../../types/entities/order.types";
//import { PatientDoctorGetRes } from "../../../types/api/patients.api.types";
import { PatientApi } from "../../../types/entities/patients.types";
import { AnalysisApi } from "../../../types/entities/analysis.types";
import { AnalysisGetByIdReq } from "../../../types/api/analysis.api.types";
import { OrderDetailsReq, OrderDetailsRes, OrdersByPatientGetReq, OrdersByPatientGetRes } from "../../../types/api/orders.api.types";
import { OrdersApi } from "../../../http/api/orders.api";
import { AxiosResponse } from "axios";
import { handleTokenRefreshedRequest } from "../../../utils/handleThunkAuth";
import { PatientByIdReq, PatientByIdRes } from "../../../types/api/patients.api.types";
import { PatientsApi } from "../../../http/api/patients.api";

type CurrentData = {
    errs: {
        patient: string
    }
    can_next: {
        patients_orders: boolean,
    }
    parts: {
        patients_orders: number
    },
    loadings: {
        order: boolean,
        patient_orders: boolean,
        patient_info: boolean,
        product_info: boolean,
        patient_orders_pagination: boolean
    },
    orderInfo: OrderDetailsApi,
    productInfo: AnalysisApi,
    patientInfo: {
        data: PatientApi,
        orders: OrderApi[]
        bonuses_data: {
            total: number
        }
    }

}

const initialState: CurrentData = {
    errs: {
        patient: ""
    },
    parts: {
        patients_orders: 0
    },
    can_next: {
        patients_orders: false
    },
    loadings: {
        order: true,
        patient_orders: true,
        patient_info: true,
        product_info: true,
        patient_orders_pagination: false,
    },
    productInfo: {
        id: 0,
        cat: 0,
        code: "",
        cost: 0,
        info: "",
        maxdur: 0,
        mindur: 0,
        name: "",
        prepare: [],
        tags: [],
        templates: []

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
            phone: "",
            date: "",
            first_name: "",
            last_name: "",
            bonus: 0
        },
        orders: [],
        bonuses_data: {
            total: 0
        }

    }
}

export const getOrderById = createAsyncThunk(
    'order/get',
    async (req: OrderDetailsReq, { dispatch }) => {
        const res: AxiosResponse<OrderDetailsRes> = await handleTokenRefreshedRequest(OrdersApi.GetById, req)
        console.log(res.data);
        return res.data
        // return new Promise<OrderDetailsApi>((res, rej) => {
        //     setTimeout(() => {
        //         res({
        //             info_order: {
        //                 doctor: "Подосёнов",
        //                 pacient: "Тузов",
        //                 status: "Отправлен",
        //                 date: "2023-01-22",
        //                 order_id: 1
        //             },
        //             results: [],
        //             analiz_list: [
        //                 {
        //                     id: 1,
        //                     title: "Анализ 1"
        //                 }
        //             ]
        //         })
        //     }, 1000)
        // })
    }
)
export const getOrdersByPatientId = createAsyncThunk(
    'patient/orders/get',
    async (req: OrdersByPatientGetReq, { dispatch }) => {
        const preparedReq: OrdersByPatientGetReq = {
            part: req.part || 1,
            pacient: req.pacient
        }
        const res: AxiosResponse<OrdersByPatientGetRes> = await handleTokenRefreshedRequest(OrdersApi.GetByPatientId, preparedReq)
       // console.log(req.pacient);
        return res.data
        // return new Promise<OrdersByPatientGetRes>((res, rej) => {
        //     setTimeout(() => {
        //         res({
        //             first_name: "Артём",
        //             last_name: "Тихомиров",
        //             can_next: true,
        //             total_bonus: 300,
        //             status: true,
        //             orders: Array(8).fill("").map((_, index) => {
        //                 return {
        //                     id: index,
        //                     pacient: "",
        //                     status: "Окончено",
        //                     date: "2024-02-24",
        //                     bonus: 300,
        //                     bonus_status: true,
        //                 }
        //             })
        //         })
        //     }, 1000)
        // })
    }
)
export const getPatientById = createAsyncThunk(
    'patient/get',
    async (req: PatientByIdReq, { dispatch }) => {
        alert(req.id)
        const res: AxiosResponse<PatientByIdRes> = await handleTokenRefreshedRequest(PatientsApi.GetById, req)
        console.log(res.data);
        return res.data
        // return new Promise<PatientApi>((res, rej) => {
        //     setTimeout(() => {
        //         res({
        //             id: 1,
        //             first_name: "Артём",
        //             last_name: "Тихомиров",
        //             bonus: 400,
        //             date: "2024-01-22",
        //             phone: "79211400129"
        //         })
        //     }, 1000)
        // })
    }
)
export const getProductById = createAsyncThunk(
    'product/get',
    async (req: AnalysisGetByIdReq, { dispatch }) => {
        return new Promise<AnalysisApi>((res, rej) => {
            setTimeout(() => {
                res({
                    id: req.id,
                    cat: 1,
                    code: "1",
                    cost: 300,
                    info: "Временно не доступно",
                    maxdur: 1,
                    mindur: 10,
                    name: "Временно не доступно",
                    prepare: [],
                    tags: [],
                    templates: []
                })
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
        },
        resetProductInfo: (state) => {
            state.productInfo = initialState.productInfo
            state.errs.patient = initialState.errs.patient
        },
        resetPatientOrders: state => {
            state.patientInfo.orders = initialState.patientInfo.orders
            state.parts.patients_orders = 0
            state.can_next.patients_orders = false
            state.loadings.patient_orders = true
        },
        incrementPatientOrdersPart: state => {
            state.parts.patients_orders += 1
        },
    },
    extraReducers: (builder) => {
        //ORDER BY ID
        builder.addCase(getOrderById.pending, (state, action) => {
            state.loadings.order = true
        })
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.orderInfo = action.payload.order
            state.loadings.order = false
        })
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loadings.order = false
        })
        //ORDERS BY PATIENT ID
        builder.addCase(getOrdersByPatientId.pending, (state, action) => {
            if (state.parts.patients_orders > 1) {
                state.loadings.patient_orders_pagination = true
                return
            }
            state.loadings.patient_orders = true
        })
        builder.addCase(getOrdersByPatientId.fulfilled, (state, action) => {
            state.patientInfo.orders = [...state.patientInfo.orders, ...action.payload.orders]
            state.patientInfo.bonuses_data.total = action.payload.total_bonus
            state.loadings.patient_orders = false
            state.loadings.patient_orders_pagination = false
            state.can_next.patients_orders = action.payload.can_next
            if (state.parts.patients_orders === 0) {
                state.parts.patients_orders = 1
            }
        })
        builder.addCase(getOrdersByPatientId.rejected, (state, action) => {
            state.loadings.patient_orders = false
        })
        //PATIENT  BY ID
        builder.addCase(getPatientById.pending, (state, action) => {
            state.loadings.patient_info = true
            state.errs.patient = initialState.errs.patient
        })
        builder.addCase(getPatientById.fulfilled, (state, action) => {
            console.log(action.payload);
            state.patientInfo.data = action.payload.pacient
            state.loadings.patient_info = false
        })
        builder.addCase(getPatientById.rejected, (state, action) => {
            state.loadings.patient_info = false
        })
        //PRODUCT  BY ID
        builder.addCase(getProductById.pending, (state, action) => {
            state.loadings.product_info = true
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.productInfo = action.payload
            state.loadings.product_info = false
        })
        builder.addCase(getProductById.rejected, (state, action) => {
            state.loadings.product_info = false
        })


    },
})

export const {
    resetOrderInfo,
    setPatientData,
    resetPatientInfo,
    incrementPatientOrdersPart,
    resetPatientOrders,
    resetProductInfo
} = CurrentDataSlice.actions


export const currentDataReducer = CurrentDataSlice.reducer