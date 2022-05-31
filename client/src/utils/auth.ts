import {useCallback} from "react";
import {LoginForm, User} from "../types/auth";
import {useDispatch, useSelector} from "react-redux";
import * as authSlice from "../store/auth.slice";
import {setAuthToken} from "../interceptor/auth";
import {checkToken} from "../services/auth";

export const getToken = () => window.localStorage.getItem('cmsWebToken') || ''

export const setToken = (token: string) => window.localStorage.setItem('cmsWebToken', token)

export const removeToken = () => window.localStorage.removeItem('cmsWebToken')

export const bootstrapUser = async () => {
    let user = null
    const token = getToken()
    if (token) {
        const res = await checkToken(token)
        user = res?.data
    }
    return user
}

export const useAuth = () => {
    const dispatch: (...args: any[]) => Promise<User | null> = useDispatch()
    const user = useSelector(authSlice.selectUser)
    const error = useSelector(authSlice.selectUserError)
    setAuthToken(user?.token)

    const login = useCallback(
        (form: LoginForm) => {
            dispatch(authSlice.login(form)).then(res => {
                console.log(res)
                if (res) {
                    setToken(res.token || '')
                }
            })
        },
        [dispatch]
    )

    const setUser = useCallback(
        (user: User) => dispatch(authSlice.setUser(user)),
        [dispatch]
    )

    const bootstrap = useCallback(
        () => {
            dispatch(authSlice.bootstrap()).then(res => {
                if (!res) removeToken()
            })
        },
        [dispatch]
    )

    const logout = useCallback(
        () => {
            dispatch(authSlice.setUser(null))
            removeToken()
        },
        [dispatch]
    )

    return {
        user,
        error,
        login,
        logout,
        setUser,
        bootstrap
    }
}