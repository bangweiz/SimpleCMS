import {Blade} from "../db/model";
import {ValidateResult} from "./type";

export const validatePostBlade = (blade: Partial<Blade>): ValidateResult => {
    const res = new ValidateResult()
    const {name, pageId, order} = blade

    if (!name) {
        res.addFieldError('name', 'No name provided')
    }
    if (!pageId) {
        res.addFieldError('pageId', 'No page id provided')
    }
    if (!order) {
        res.addFieldError('order', 'No order number provided')
    }

    return res
}