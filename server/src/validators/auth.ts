import {LoginData, RegisterData} from "../controller/user/type";
import {ValidateResult} from "./type";
import {validateEmail} from "../util/utils";

export const validateLogin = (data: LoginData): ValidateResult => {
    const {email, password} = data
    const res = new ValidateResult()
    if (!email) {
        res.addRequiredError('email')
    } else if (!validateEmail(email)) {
        res.addFieldError('email', 'Please enter a valid email')
    }
    if (!password) {
        res.addRequiredError('password')
    }
    return res
}

export const validateRegister = (data: RegisterData): ValidateResult => {
    const {email, password, username, cpassword} = data
    const res = new ValidateResult()

    if (!email) {
        res.addRequiredError('email')
    }
    if (!password) {
        res.addRequiredError('password')
    }
    if (!username) {
        res.addRequiredError('username')
    }
    if (!cpassword) {
        res.addRequiredError('confirm password')
    }

    if (password && cpassword && password !== cpassword) {
        res.addFieldError('confirm password', 'Passwords are not same')
    }
    return res
}