import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";
import { PatientApi } from "../../../types/entities/patients.types";

type PatientsSliceState = {
    items: Contact[],
    invitingsIds: string[],
    list: PatientApi[]
    loadings: {
        patients: boolean
    }
}

const initialState: PatientsSliceState = {
    items: [],
    invitingsIds: [],
    list: [],
    loadings: {
        patients: true
    }
}
export const getAllPatients = createAsyncThunk(
    'patients/get',
    async (req, { dispatch }) => {
        return new Promise<PatientApi[]>((res, rej) => {
            setTimeout(() => {
                res([
                    {
                        id: 1,
                        bonus: 10,
                        date: "2024-01-22",
                        first_name: "Артём",
                        last_name: "Тихомиров",
                        phone: "+79005001849"
                    }
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
            state.loadings.patients = false
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