import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "./index";
import * as websiteService from "../services/website"
import {WebsiteSettings} from "../types/website";

interface State {
    settings: WebsiteSettings | null
}

const initialState: State = {
    settings: null
}

export const websiteSlice = createSlice({
    name: 'website',
    initialState,
    reducers: {
        setWebsiteSettings(state, action) {
            state.settings = action.payload
        }
    }
})

export const {setWebsiteSettings} = websiteSlice.actions

export const selectWebsite = (state: RootState) => state.website

export const getWebsiteSettings = () => async (dispatch:AppDispatch) => {
    const res = await websiteService.getWebsiteSettings()
    if (res?.code === 200) {
        dispatch(setWebsiteSettings(res.data))
        return res.data
    }
    return null
}