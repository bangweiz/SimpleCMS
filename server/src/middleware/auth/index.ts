import { Request, Response, NextFunction } from "express"
import {checkToken} from "../../util/auth";
import {Result} from "../../pkg/helperClass/result";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers
    if (checkToken(authorization)) {
        next()
    } else {
        res.json(new Result(400, undefined, {msg: 'Unauthorised'}))
    }
}