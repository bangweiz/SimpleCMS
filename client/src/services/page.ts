import axios from "axios";
import {Page, PageStatus, RawPage} from "../types/page";
import {BaseRes} from "../types";

const BASE_URL = 'http://localhost:5000'
export const getPages = async (): Promise<BaseRes<RawPage[]> | null> => {
    try {
        const res = await axios.get<BaseRes<RawPage[]>>(BASE_URL + '/pages')
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const getPage = async (pageId: number | string): Promise<BaseRes<Page> | null> => {
    try {
        const res = await axios.get<BaseRes<Page>>(`${BASE_URL}/pages/${pageId}`)
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const updatePage = async (page: Partial<RawPage>, pageId: string | number) => {
    try {
        const res = await axios.put<BaseRes<{affectedCount: number}>>(`${BASE_URL}/pages/${pageId}`, {
            page
        })
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const createPage = async (page: Partial<RawPage>) => {
    try {
        const res = await axios.post<BaseRes<RawPage> | null>(`${BASE_URL}/pages`, {page})
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const deletePage = async (pageId: number | string) => {
    try {
        const res = await axios.delete<BaseRes<{affectedCount: number}>>(`${BASE_URL}/pages/${pageId}`)
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const trashPage = async (pageId: number | string) => {
    return updatePage({
        status: PageStatus.TRASH
    }, pageId)
}