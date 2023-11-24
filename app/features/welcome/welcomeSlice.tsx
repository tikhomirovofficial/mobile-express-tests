import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type WelcomeSliceState = {
    welcomeStep: number
}

const initialState: WelcomeSliceState = {
    welcomeStep: 0
}
export const WelcomeSlice = createSlice({
    name: "welcome",
    initialState,
    reducers: {
        setWelcomeStep: (state, action) => {
            state.welcomeStep = action.payload
        }
    }
})

export const {
    setWelcomeStep
} = WelcomeSlice.actions


export const welcomeReducer = WelcomeSlice.reducer