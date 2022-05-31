import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth.slice";
import {pageSlice} from "./page.slice";
import {bladeSlice} from "./blade.slice";
import {websiteSlice} from "./website.slice";

export const rootReducer = {
    auth: authSlice.reducer,
    pages: pageSlice.reducer,
    blades: bladeSlice.reducer,
    website: websiteSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>