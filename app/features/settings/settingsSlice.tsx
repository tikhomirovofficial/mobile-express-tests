import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryApi } from "../../../types/entities/categories.types";
import { CategoriesGetReq, CategoriesGetRes } from "../../../types/api/categories.api.types";

type SettingsSliceState = {
    theme: "light" | "dark"
}

const initialState: SettingsSliceState = {
    theme: "light"
}

export const SettingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
            state.theme = action.payload
        }
    },

})

export const { setTheme } = SettingsSlice.actions
export const categoriesReducer = SettingsSlice.reducer