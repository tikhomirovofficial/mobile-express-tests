import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalsSliceState = {
    orderInfoModal: boolean
    profileEditModal: boolean,
    patientsModal: boolean
    aboutAppModal: boolean
    bonusesModal: boolean
    ordersFinancesModal: boolean,
    patientInfoModal: boolean,
    patientInvitingModal: boolean,
    patientOrderInfoModal: boolean
}

const initialState: ModalsSliceState = {
    orderInfoModal: false,
    patientsModal: false,
    bonusesModal: false,
    aboutAppModal: false,
    ordersFinancesModal: false,
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
        handleAboutModal: (state) => {
            state.aboutAppModal = !state.aboutAppModal
        },
        handleBonusesModal: (state) => {
            state.bonusesModal = !state.bonusesModal
        },
        handlePatientInfoModal: (state) => {
            state.patientInfoModal = !state.patientInfoModal
        },
        handlePatientInvitingModal: (state) => {
            state.patientInvitingModal = !state.patientInvitingModal
        },
        handlePatientOrderInfoModal: (state) => {
            state.patientInvitingModal = !state.patientInvitingModal
        },
        handleOrdersFinancesModal: (state) => {
            state.ordersFinancesModal = !state.ordersFinancesModal
        }

    }
})

export const {
    handleOrderInfoModal,
    handleProfileEditModal,
    handlePatientsModal,
    handlePatientInfoModal,
    handleBonusesModal,
    handleAboutModal,
    handlePatientInvitingModal,
    handlePatientOrderInfoModal,
    handleOrdersFinancesModal
} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer