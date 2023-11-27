import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";

type PatientsSliceState = {
    items: Contact[],
    invitingsIds: string[]
}

const initialState: PatientsSliceState = {
    items: [],
    invitingsIds: []
}
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
        resetInvitingsIds(state)  {
            state.invitingsIds = []
        }
        
    }
})

export const {
    setPatients,
    addInvitingsId,
    setInvigitingsIds,
    removeInvitingsId,
    resetInvitingsIds
} = PatientsSlice.actions


export const patientsReducer = PatientsSlice.reducer