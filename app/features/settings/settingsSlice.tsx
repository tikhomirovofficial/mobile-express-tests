import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryApi } from "../../../types/entities/categories.types";
import { CategoriesGetReq, CategoriesGetRes } from "../../../types/api/categories.api.types";
import { Appearance } from "react-native";
import { getTheme } from "../../../utils/storeTheme";

type SettingsSliceState = {
    loading: boolean
    theme: "light" | "dark"
}

const initialState: SettingsSliceState = {
    loading: true,
    theme: "light"
}
export const initAppTheme = createAsyncThunk(
    'theme/get',
    async (_, { dispatch }) => {
        const theme = await getTheme()
        if (!theme) {
            throw theme
        }
        return new Promise<string>((res, rej) => {
            res(theme)
        })

    }
)
export const SettingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
            state.theme = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(initAppTheme.fulfilled, (state, action) => {
            state.theme = action.payload as "light" | "dark"
            //state.theme = "dark"
            state.loading = false
        })
        builder.addCase(initAppTheme.rejected, (state, action) => {
            state.theme = "light" as "light" | "dark"
            state.loading = false
        })
    },

})

export const { setTheme } = SettingsSlice.actions
export const settingsReducer = SettingsSlice.reducer