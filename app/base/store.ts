import { configureStore } from '@reduxjs/toolkit'
import {welcomeReducer} from "../features/welcome/welcomeSlice";

export const store = configureStore({
    reducer: {
        welcome: welcomeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch