import {createSlice} from "@reduxjs/toolkit";
import {Page, RawPage} from "../types/page";
import {AppDispatch, RootState} from "./index";
import * as pageService from '../services/page'
import {SwapOrderArg} from "../types/auth";
import {Blade} from "../types/blade";
import * as bladeService from "../services/blade";

interface State {
    pages: RawPage[],
    page: Page | null,
    error: {[key: string]: string} | null
}

const initialState: State = {
    pages: [],
    page: null,
    error: null
}

export const pageSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setPages(state, action) {
            state.pages = action.payload
        },
        addPage(state, action) {
            state.pages = [...state.pages, action.payload]
        },
        removePage(state, action) {
            state.pages = state.pages.filter(page => page.id !== action.payload)
        },
        setPage(state, action) {
            state.page = action.payload
        },
        updatePage(state, action) {
            state.page = {...state.page, ...action.payload}
        },
        setBlades(state, action) {
            if (state.page) {
                state.page.blades = action.payload
            }
        },
        addBladeToPage(state, action) {
            if (state.page) {
                state.page.blades = [...state.page.blades, action.payload]
            }
        },
        removeOneBladeFromPage(state, action) {
            if (state.page) {
                state.page.blades = state.page.blades.filter(blade => {
                    return blade.id !== action.payload
                })
            }
        },
        setPageError(state, action) {
            state.error = action.payload
        },
        removePageError(state) {
            state.error = null
        }
    }
})

export const {
    setPages,
    setPage,
    setBlades,
    updatePage,
    addPage,
    removePage,
    addBladeToPage,
    removeOneBladeFromPage,
    setPageError,
    removePageError
} = pageSlice.actions

export const selectPages = (state: RootState) => state.pages.pages
export const selectPage = (state: RootState) => state.pages.page
export const selectPageError = (state: RootState) => state.pages.error

export const getPages = () => async (dispatch: AppDispatch) => {
    const res = await pageService.getPages()
    if (res?.code === 200 && res.data) {
        dispatch(setPages(res.data))
        return res.data
    }
    dispatch(setPages([]))
    return []
}

export const getPage = (pageId: string | number) => async (dispatch: AppDispatch) => {
    const res = await pageService.getPage(pageId)
    if (res?.code === 200 && res.data) {
        dispatch(setPage(res.data))
        return res.data
    }
    dispatch(setPage(null))
    return null
}

export const swapBlades = (blade1: SwapOrderArg, blade2: SwapOrderArg, oldBlades: Blade[]) => async (dispatch: AppDispatch) => {
    try {
        const res = await bladeService.swapBlades(blade1, blade2)
        if (!res || !res.data || res.data === 0) {
            dispatch(setBlades(oldBlades))
        }
    } catch (e) {
        console.error(e)
        dispatch(setBlades(oldBlades))
    }
}

export const updateOnePage = (page: Partial<RawPage>, pageId: number | string) => async (dispatch: AppDispatch) => {
    const res = await pageService.updatePage(page, pageId)
    if (res?.code === 200 && res.data?.affectedCount === 1) {
        dispatch(updatePage(page))
        return page
    }
    dispatch(setPageError(res?.error))
    return null
}

export const createPage = (page: Partial<RawPage>) => async (dispatch: AppDispatch) => {
    const res = await pageService.createPage(page)
    if (res?.code === 200 && res?.data) {
        dispatch(addPage(res.data))
        return res.data
    } else {
        dispatch(setPageError(res?.error))
        return null
    }
}

export const deletePage = (pageId: number | string) => async (dispatch: AppDispatch): Promise<number> => {
    try {
        const res = await pageService.deletePage(pageId)
        if (res?.data?.affectedCount) {
            if (typeof pageId === 'string') {
                dispatch(removePage(parseInt(pageId)))
            } else {
                dispatch(removePage(pageId))
            }
        }
        return res?.data?.affectedCount || 0
    } catch (e) {
        console.error(e)
        return 0
    }
}

export const trashPage = (pageId: number | string) => async (dispatch: AppDispatch) => {
    try {
        const res = await pageService.trashPage(pageId)
        if (res && res.data?.affectedCount === 1) {
            if (typeof pageId === 'string') {
                dispatch(removePage(parseInt(pageId)))
            } else {
                dispatch(removePage(pageId))
            }            return 1
        }
        return 0
    } catch (e) {
        return 0
    }
}