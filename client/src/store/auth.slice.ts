import {createSlice} from "@reduxjs/toolkit";
import {LoginForm, User} from "../types/auth";
import {AppDispatch, RootState} from "./index";
import * as authService from "../services/auth"
import {bootstrapUser} from "../utils/auth";

interface State {
    user: User | null
    error: {[key: string]: string} | null
}

const initialState: State = {
    user: null,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
            state.error = null
        },
        removeUser(state) {
            state.user = null
            state.error = null
        },
        setError(state, action) {
            state.error = action.payload
        },
        removeError(state) {
            state.error = null
        }
    }
})

export const { setUser, removeUser, setError, removeError } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectUserError = (state: RootState) => state.auth.error

export const login = (form: LoginForm) => async (dispatch: AppDispatch) => {
    const res = await authService.login(form)
    if (res?.code === 200 && res?.data) {
        dispatch(setUser(res.data))
        return res.data
    } else {
        dispatch(setError(res?.error))
        return null
    }
}

export const bootstrap = () => async (dispatch: AppDispatch) => {
    const res = await bootstrapUser()
    if (res) {
        dispatch(setUser(res))
    } else {
        dispatch(removeUser())
    }
    return res
}
