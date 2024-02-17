import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";
import { PatientApi } from "../../../types/entities/patients.types";
import { PatientsBySearchReq, PatientsBySearchRes, PatientsDoctorGetReq, PatientsDoctorGetRes } from "../../../types/api/patients.api.types";
import { HasNextPart, HasPart } from "../../../types/common.types";
import { GetAllOrdersReq, GetAllOrdersRes } from "../../../types/api/orders.api.types";
import { AxiosResponse } from "axios";
import { OrdersApi } from "../../../http/api/orders.api";
import { handleTokenRefreshedRequest} from "../../../utils/handleThunkAuth";
import { PatientsApi } from "../../../http/api/patients.api";

type PatientsSliceState = {
    items: Contact[],
    invitingsIds: number[],
    list: PatientApi[]
    searched_list: PatientApi[]
    searched_can_next: boolean
    can_next: boolean,
    searched_part: number
    loadings: {
        patients: boolean,
        search_patients: boolean,
        patients_pagination: boolean
        search_patients_pagination: boolean
    }
} & HasNextPart & HasPart

const initialState: PatientsSliceState = {
    items: [],
    invitingsIds: [],
    list: [],
    searched_list: [],
    searched_part: 0,
    part: 0,
    can_next: false,
    searched_can_next: false,
    loadings: {
        patients: true,
        search_patients: true,
        patients_pagination: false,
        search_patients_pagination: false
    }
}
export const getSearchPatients = createAsyncThunk(
    'patients/search/get',
    async (req: PatientsBySearchReq, { dispatch }) => {
        return new Promise<PatientsBySearchRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    can_next: true,
                    pacients: Array(8).fill("").map((_, index) => {
                        return {
                            id: index + 1,
                            bonus: 10,
                            date: "2024-01-22",
                            first_name: "Дмитрий",
                            last_name: "Тихомиров " + index,
                            phone: "+79005001849"
                        }
                    })
                })
            }, 1000)
        })
    }
)
export const getAllPatients = createAsyncThunk(
    'patients/get',
    async (req: PatientsDoctorGetReq, { dispatch }) => {
        const preparedReq: PatientsDoctorGetReq = {
            part: req.part || 1
        }
        const res: AxiosResponse<PatientsDoctorGetRes> = await handleTokenRefreshedRequest(PatientsApi.GetAll, preparedReq)
        console.log(res.data);
        return res.data
    }
)

export const PatientsSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        setPatients(state, action: PayloadAction<Contact[]>) {
            state.items = action.payload
        },
        setInvigitingsIds(state, action: PayloadAction<number[]>) {
            state.invitingsIds = action.payload
        },
        addInvitingsId(state, action: PayloadAction<number>) {
            state.invitingsIds = [...state.invitingsIds, action.payload]
        },
        removeInvitingsId(state, action: PayloadAction<number>) {
            state.invitingsIds = state.invitingsIds.filter(item => item !== action.payload)
        },
        resetInvitingsIds(state) {
            state.invitingsIds = []
        },
        resetAllPatients(state) {
            state.list = []
            state.can_next = false
            state.loadings.patients = true
            state.part = 0
        },
        resetSearchedPatients(state) {
            state.searched_list = []
            state.searched_can_next = false
            state.loadings.search_patients = true
            state.searched_part = 0
        },
        incrementPatientsPart: state => {
            state.part += 1
        },
        incrementSearchedPatientsPart: state => {
            state.searched_part += 1
        },

    },
    extraReducers: (builder) => {
        //DOCTOR PATIENTS
        builder.addCase(getAllPatients.pending, (state, action) => {
            if (state.part > 1) {
                state.loadings.patients_pagination = true
                return
            }
            state.loadings.patients = true
        })
        builder.addCase(getAllPatients.fulfilled, (state, action) => {
            state.list = [...state.list, ...action.payload.pacients]
            state.can_next = action.payload.can_next
            state.loadings.patients = false
            state.loadings.patients_pagination = false
            if (state.part === 0) {
                state.part = 1
            }
        })
        builder.addCase(getAllPatients.rejected, (state, action) => {

            state.loadings.patients = false
        })
        //DOCTOR SEARCH PATIENTS
        builder.addCase(getSearchPatients.pending, (state, action) => {
            if (state.searched_part > 1) {
                state.loadings.search_patients_pagination = true
                return
            }
            state.loadings.search_patients = true
        })
        builder.addCase(getSearchPatients.fulfilled, (state, action) => {
            state.searched_list = [...state.searched_list, ...action.payload.pacients]
            state.searched_can_next = action.payload.can_next
            state.loadings.search_patients = false
            state.loadings.search_patients_pagination = false
            if (state.searched_part === 0) {
                state.searched_part = 1
            }
        })
        builder.addCase(getSearchPatients.rejected, (state, action) => {
            state.loadings.search_patients = false
        })

    },
})

export const {
    setPatients,
    addInvitingsId,
    setInvigitingsIds,
    removeInvitingsId,
    resetInvitingsIds,
    resetSearchedPatients,
    incrementPatientsPart,
    incrementSearchedPatientsPart,
    resetAllPatients
} = PatientsSlice.actions


export const patientsReducer = PatientsSlice.reducer