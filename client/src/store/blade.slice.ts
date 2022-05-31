import {Blade, BladeType} from "../types/blade";
import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "./index";
import * as bladeService from "../services/blade"
import {addBladeToPage, removeOneBladeFromPage} from "./page.slice";

interface State {
    blade: Blade | null,
    error: {[key: string]: string} | null
}

const initialState: State = {
    blade: null,
    error: null
}

export const bladeSlice = createSlice({
    name: 'blades',
    initialState,
    reducers: {
        setBlade(state, action) {
            state.blade = action.payload
        },
        renewBlade(state, action) {
            const content = {...state.blade?.content, ...action.payload.data}
            console.log(content)
            state.blade = {...state.blade, ...action.payload, content}
        },
        setBladeError(state, action) {
            state.error = action.payload
        },
        removeBladeError(state) {
            state.error = null
        }
    }
})

export const {setBlade, renewBlade, setBladeError, removeBladeError} = bladeSlice.actions

export const selectBlade = (state: RootState) => state.blades.blade
export const selectBladeError = (state: RootState) => state.blades.error

export const getBlade = (bladeId: string | number, bladeType: BladeType) => async (dispatch: AppDispatch) => {
    const res = await bladeService.getBlade(bladeId, bladeType)
    if (res && res.data) {
        dispatch(setBlade(res.data))
        return res.data
    }
    return null
}

export const updateBlade =
    (bladeId: string | number, bladeType: BladeType, blade: Partial<Blade>) =>
    async (dispatch: AppDispatch) => {
    const res = await bladeService.updateBlade(bladeId, bladeType, blade)
    if (res && res.data) {
        dispatch(renewBlade(blade))
        return res.data.affectedCount
    }
    return 0
}

export const createBlade = (blade: Partial<Blade>) => async (dispatch: AppDispatch) =>{
    const res = await bladeService.createBlade(blade)
    if (res?.code === 200 && res.data) {
        dispatch(addBladeToPage(res.data))
        return res.data
    }
    dispatch(setBladeError(res?.error))
    return null
}

export const deleteBlade = (bladeId: string | number, bladeType: BladeType) => async (dispatch: AppDispatch) =>{
    const res = await bladeService.deleteBlade(bladeId, bladeType)
    if (res && res.data) {
        dispatch(removeOneBladeFromPage(bladeId))
        return res.data.affectedCount
    }
    return 0
}