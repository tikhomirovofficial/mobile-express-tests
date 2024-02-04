import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalsSliceState = {
    orderInfoModal: boolean
    profileEditModal: boolean,
    patientsModal: boolean
    aboutAppModal: boolean,
    bonusesBottomSheet: boolean,
    analysisInfoModal: boolean
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
    bonusesBottomSheet: false,
    ordersFinancesModal: false,
    analysisInfoModal: false,
    profileEditModal: false,
    patientInfoModal: false,
    patientInvitingModal: false,
    patientOrderInfoModal: false

}
export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleOrderInfoModal: (state) => { state.orderInfoModal = !state.orderInfoModal },
        handleProfileEditModal: (state) => { state.profileEditModal = !state.profileEditModal },
        handlePatientsModal: (state) => { state.patientsModal = !state.patientsModal },
        handleAboutModal: (state) => { state.aboutAppModal = !state.aboutAppModal },
        handleBonusesModal: (state) => { state.bonusesModal = !state.bonusesModal },
        handlePatientInfoModal: (state) => { state.patientInfoModal = !state.patientInfoModal },
        handlePatientInvitingModal: (state) => { state.patientInvitingModal = !state.patientInvitingModal },
        handlePatientOrderInfoModal: (state) => { state.patientOrderInfoModal = !state.patientOrderInfoModal },
        handleBonusesBottomSheet: (state) => { state.bonusesBottomSheet = !state.bonusesBottomSheet },
        handleOrdersFinancesModal: (state) => { state.ordersFinancesModal = !state.ordersFinancesModal },
        handleAnalysisInfoModal: (state) => { state.analysisInfoModal = !state.analysisInfoModal },
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
    handleBonusesBottomSheet,
    handleAnalysisInfoModal,
    handlePatientOrderInfoModal,
    handleOrdersFinancesModal
} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer