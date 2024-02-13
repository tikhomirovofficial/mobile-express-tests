import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";
import { PatientApi } from "../../../types/entities/patients.types";
import { PatientsBySearchReq } from "../../../types/api/patients.api.types";

type PatientsSliceState = {
    items: Contact[],
    invitingsIds: string[],
    list: PatientApi[]
    searched_list: PatientApi[]
    loadings: {
        patients: boolean,
        search_patients: boolean
    }
}

const initialState: PatientsSliceState = {
    items: [],
    invitingsIds: [],
    list: [],
    searched_list: [],
    loadings: {
        patients: true,
        search_patients: true
    }
}
export const getSearchPatients = createAsyncThunk(
    'patients/search/get',
    async (req: PatientsBySearchReq, { dispatch }) => {
        return new Promise<PatientApi[]>((res, rej) => {
            setTimeout(() => {
                res([...Array(3).fill(
                    {
                        id: 1,
                        bonus: 10,
                        date: "2024-01-22",
                        first_name: "Артём",
                        last_name: "Тихомиров",
                        phone: "+79005001849"
                    },)
                ])
            }, 1000)
        })
    }
)
export const getAllPatients = createAsyncThunk(
    'patients/get',
    async (req, { dispatch }) => {
        return new Promise<PatientApi[]>((res, rej) => {
            setTimeout(() => {
                res([...Array(12).fill(
                    {
                        id: 1,
                        bonus: 10,
                        date: "2024-01-22",
                        first_name: "Артём",
                        last_name: "Тихомиров",
                        phone: "+79005001849"
                    },)
                ])
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
        }

    },
    extraReducers: (builder) => {
        //DOCTOR PATIENTS
        builder.addCase(getAllPatients.pending, (state, action) => {
            state.loadings.patients = true
        })
        builder.addCase(getAllPatients.fulfilled, (state, action) => {
            state.list = action.payload
            state.loadings.patients = false
        })
        builder.addCase(getAllPatients.rejected, (state, action) => {
            state.loadings.
            patients = false
        })
        //DOCTOR SEARCH PATIENTS
        builder.addCase(getSearchPatients.pending, (state, action) => {
            state.loadings.search_patients = true
        })
        builder.addCase(getSearchPatients.fulfilled, (state, action) => {
            state.searched_list = action.payload
            state.loadings.search_patients = false
        })
        builder.addCase(getSearchPatients.rejected, (state, action) => {
            state.loadings.
            search_patients = false
        })

    },
})

export const {
    setPatients,
    addInvitingsId,
    setInvigitingsIds,
    removeInvitingsId,
    resetInvitingsIds
} = PatientsSlice.actions


export const patientsReducer = PatientsSlice.reducer