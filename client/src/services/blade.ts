import axios from "axios";
import {Blade, BladeType} from "../types/blade";
import {BaseRes} from "../types";
import {SwapOrderArg} from "../types/auth";

const BASE_URL = 'http://localhost:5000'

export const getBlades = async (pageId: number | string): Promise<BaseRes<Blade[]> | null> => {
    try {
        const res = await axios.get<BaseRes<Blade[]>>(`${BASE_URL}/blades?pageId=${pageId}`)
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const swapBlades = async (blade1: SwapOrderArg, blade2: SwapOrderArg): Promise<BaseRes<number> | null> => {
    try {
        const res = await axios.put<BaseRes<number>>(`${BASE_URL}/blades`, {
            blade1,
            blade2
        })
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const createBlade = async (blade: Partial<Blade>) => {
    try {
        const res = await axios.post<BaseRes<Blade>>(`${BASE_URL}/blades`, {
            blade
        })
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const getBlade = async (bladeId: string | number, bladeType: BladeType): Promise<BaseRes<Partial<Blade>> | null> => {
    try {
        const res = await axios.get<BaseRes<Partial<Blade>>>(`${BASE_URL}/blades/${bladeType}/${bladeId}`)
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const updateBlade = async (bladeId: string | number, bladeType: BladeType, blade: Partial<Blade>) => {
    if (bladeType === BladeType.NULL) {
        return null
    }

    try {
        const res = await axios.put<BaseRes<{affectedCount: number}>>(`${BASE_URL}/blades/${bladeType}/${bladeId}`, {
            blade
        })
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const deleteBlade = async (bladeId: string | number, bladeType: BladeType) => {
    try {
        const res = await axios.delete<BaseRes<{affectedCount: number}>>(`${BASE_URL}/blades/${bladeType}/${bladeId}`)
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}