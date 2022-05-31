import {Request} from 'express'

export interface RegisterRequest extends Request {
    body: RegisterData
}

export interface LoginRequest extends Request {
    body: LoginData
}

export interface LoginResult {
    id: number,
    email: string,
    username: string,
    token: string
}

export interface LoginData {
    email: string
    password: string
}

export interface  RegisterData extends LoginData {
    username: string
    cpassword: string
}