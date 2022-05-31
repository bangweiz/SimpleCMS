export interface LoginForm {
    email: string,
    password: string
}

export interface User {
    id: number,
    email: string
    username: string,
    token: string
}

export interface SwapOrderArg {
    id: number,
    order: number
}