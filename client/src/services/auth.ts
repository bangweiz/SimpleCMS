import axios from "axios";
import {LoginForm, User} from "../types/auth";
import {BaseRes} from "../types";

const BASE_URL = 'http://localhost:5000'

export const login = async (data: LoginForm) => {
    try {
        const res = await axios.post<BaseRes<User>>(`${BASE_URL}/users/login`, data)
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const checkToken = async (token: string) => {
    try {
        const res = await axios.post<BaseRes<User>>(`${BASE_URL}/users/token`, {token})
        return res.data
    } catch (e) {
        console.error(e)
        return null
    }
}