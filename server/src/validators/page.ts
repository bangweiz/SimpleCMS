import {ValidateResult} from "./type";
import {Page} from "../db/model";

export const validatePostPage = (page: Partial<Page>): ValidateResult => {
    const res = new ValidateResult()
    const {title, userId} = page
    if (!title) {
        res.addRequiredError('title')
    }
    if (!userId){
        res.addGlobalError('No user id provided')
    }
    return res
}