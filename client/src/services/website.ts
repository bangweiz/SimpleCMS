import axios from "axios";
import {BaseRes} from "../types";
import {WebsiteSettings} from "../types/website";

const BASE_URL = 'http://localhost:5000'
export const getWebsiteSettings = async () => {
    try {
        const res = await axios.get<BaseRes<WebsiteSettings> | null>(`${BASE_URL}/website`)
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}