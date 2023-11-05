import { configureStore } from '@reduxjs/toolkit'
import {welcomeReducer} from "../features/welcome/welcomeSlice";
import {modalsReducer} from "../features/modals/modalsSlice";
import {profileReducer} from "../features/profile/profileSlice";

export const store = configureStore({
    reducer: {
        welcome: welcomeReducer,
        modals: modalsReducer,
        profile: profileReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch