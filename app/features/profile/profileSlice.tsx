import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../../types/entities/user.types";
import { HasLoading } from "../../../types/common.types";

type ProfileSliceState = {
    data: ProfileData
} & HasLoading

const initialState: ProfileSliceState = {
    data: {
        first_name: "Борис",
        last_name: "Борисов",
        subname: "Борисович",
        dob: "2000-11-11",
        image: "/",
        bonus: 3
    },
    loading: false
}

export const getProfile = createAsyncThunk(
    'profile/get',
    (req, { dispatch }) => {

    }
)

export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state, action) => {

        })
        builder.addCase(getProfile.fulfilled, (state, action) => {

        })
        builder.addCase(getProfile.rejected, (state, action) => {

        })

    },
})

export const {

} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer