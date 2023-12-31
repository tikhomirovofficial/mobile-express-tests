import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ModalsSliceState = {
    orderInfoModal: boolean
    profileEditModal: boolean,
    patientsModal: boolean
    patientInfoModal: boolean,
    patientInvitingModal: boolean,
    patientOrderInfoModal: boolean
}

const initialState: ModalsSliceState = {
    orderInfoModal: false,
    patientsModal: false,
    profileEditModal: false,
    patientInfoModal: false,
    patientInvitingModal: false,
    patientOrderInfoModal: false

}
export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleOrderInfoModal: (state) => {
            state.orderInfoModal = !state.orderInfoModal
        },
        handleProfileEditModal: (state) => {
            state.profileEditModal = !state.profileEditModal
        },
        handlePatientsModal: (state) => {
            state.patientsModal = !state.patientsModal
        },
        handlePatientInfoModal: (state) => {
            state.patientInfoModal = !state.patientInfoModal
        },
        handlePatientInvitingModal: (state) => {
            state.patientInvitingModal = !state.patientInvitingModal
        },
        handlePatientOrderInfoModal: (state) => {
            state.patientInvitingModal = !state.patientInvitingModal
        }
    }
})

export const {
    handleOrderInfoModal,
    handleProfileEditModal,
    handlePatientsModal,
    handlePatientInfoModal,
    handlePatientInvitingModal,
    handlePatientOrderInfoModal

} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer