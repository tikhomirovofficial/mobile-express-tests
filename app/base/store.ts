import { configureStore } from '@reduxjs/toolkit'
import {welcomeReducer} from "../features/welcome/welcomeSlice";
import {modalsReducer} from "../features/modals/modalsSlice";
import {profileReducer} from "../features/profile/profileSlice";
import { cartReducer } from '../features/cart/cartSlice';
import { productsReducer } from '../features/products/productSlice';

export const store = configureStore({
    reducer: {
        welcome: welcomeReducer,
        modals: modalsReducer,
        profile: profileReducer,
        cart: cartReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch