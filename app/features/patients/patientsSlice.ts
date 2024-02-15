import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";
import { PatientApi } from "../../../types/entities/patients.types";
import { PatientDoctorGetRes, PatientsBySearchReq, PatientsBySearchRes, PatientsDoctorGetReq } from "../../../types/api/patients.api.types";
import { HasNextPart, HasPart } from "../../../types/common.types";
import { GetAllOrdersRes } from "../../../types/api/orders.api.types";

type PatientsSliceState = {
    items: Contact[],
    invitingsIds: string[],
    list: PatientApi[]
    searched_list: PatientApi[]
    searched_can_next: boolean
    can_next: boolean,
    searched_part: number
    loadings: {
        patients: boolean,
        search_patients: boolean
    }
} & HasNextPart & HasPart

const initialState: PatientsSliceState = {
    items: [],
    invitingsIds: [],
    list: [],
    searched_list: [],
    searched_part: 1,
    part: 1,
    can_next: false,
    searched_can_next: false,
    loadings: {
        patients: true,
        search_patients: true
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
                    pacients: [
                        {
                            id: 1,
                            bonus: 10,
                            date: "2024-01-22",
                            first_name: "Дмитрий",
                            last_name: "Тихомиров",
                            phone: "+79005001849"
                        }
                    ]
                })
            }, 1000)
        })
    }
)
export const getAllPatients = createAsyncThunk(
    'patients/get',
    async (req: PatientsDoctorGetReq, { dispatch }) => {
        return new Promise<PatientDoctorGetRes>((res, rej) => {
            setTimeout(() => {
                res({
                    status: true,
                    can_next: true,
                    pacients: [
                        {
                            id: 1,
                            phone: "+79005001849",
                            first_name: "Дмитрий",
                            last_name: "Тихомиров",
                            bonus: 10,
                            date: "2024-01-22"
                        }
                    ],

                })
            }, 1000)
        })
    }
)

export const PatientsSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        setPatients(state, action: PayloadAction<Contact[]>) {
            state.items = action.payload
        },
        setInvigitingsIds(state, action: PayloadAction<string[]>) {
            state.invitingsIds = action.payload
        },
        addInvitingsId(state, action: PayloadAction<string>) {
            state.invitingsIds = [...state.invitingsIds, action.payload]
        },
        removeInvitingsId(state, action: PayloadAction<string>) {
            state.invitingsIds = state.invitingsIds.filter(item => item !== action.payload)
        },
        resetInvitingsIds(state) {
            state.invitingsIds = []
        },
        resetAllPatients(state) {
            state.list = []
            state.can_next = false
            state.loadings.patients = true
            state.part = 1
        },
        resetSearchedPatients(state) {
            state.searched_list = []
            state.searched_can_next = false
            state.loadings.search_patients = true
            state.searched_part = 1
        }

    },
    extraReducers: (builder) => {
        //DOCTOR PATIENTS
        builder.addCase(getAllPatients.pending, (state, action) => {
            state.loadings.patients = true
        })
        builder.addCase(getAllPatients.fulfilled, (state, action) => {
            state.list = action.payload.pacients
            state.can_next = action.payload.can_next
            state.loadings.patients = false
        })
        builder.addCase(getAllPatients.rejected, (state, action) => {
            state.loadings.patients = false
        })
        //DOCTOR SEARCH PATIENTS
        builder.addCase(getSearchPatients.pending, (state, action) => {
            state.loadings.search_patients = true
        })
        builder.addCase(getSearchPatients.fulfilled, (state, action) => {
            state.searched_list = action.payload.pacients
            state.searched_can_next = action.payload.can_next
            state.loadings.search_patients = false
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
    resetAllPatients
} = PatientsSlice.actions


export const patientsReducer = PatientsSlice.reducer