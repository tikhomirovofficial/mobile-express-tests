import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ProfileSliceState = {
    data: {

    }
}

const initialState: ProfileSliceState = {
    data: {

    }
}
export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileData: (state,action) => {
           state.data = {

           }
        }
    }
})

export const {
    setProfileData
} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer