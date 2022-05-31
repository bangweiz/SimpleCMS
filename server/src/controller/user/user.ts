import {Request, Response} from "express";
import {Controller, Post, Wired} from "../../pkg/dicorator/controller";
import {LoginRequest, LoginResult, RegisterRequest} from "./type";
import {UserService} from "../../service/";
import {Result} from "../../pkg/helperClass/result";
import {comparePassword, decodeToken, generateToken, hashPassword} from "../../util/auth";
import {validateLogin} from "../../validators/auth";

@Controller('/users')
export class UserController {
    @Wired
    private userService: UserService;

    @Post('/register')
    async register(req: RegisterRequest, res:Response) {
        const result = new Result<LoginResult>()
        const validateRes = validateLogin(req.body)
        if (validateRes.hasError) {
            res.json(result.setCode(400).setError(validateRes.error))
            return
        }

        const {username, email, password} = req.body
        try {
            const user = await this.userService.findOne({
                where: { email },
                attributes: ['email']
            })
            if (user) {
                res.json(result.setCode(404).setError({email: 'Email has been used'}))
                return
            }
            const now = new Date().toJSON()
            const newUser = await this.userService.createOne({
                username,
                email,
                password: hashPassword(password),
                createdAt: now,
                updatedAt: now
            })
            if (newUser) {
                res.json(result.setCode(200).setData({
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username,
                    token: 'Bearer xy'
                }))
                return
            }
            res.json(result.setCode(404).setError({msg: 'Something went wrong'}))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(404).setError({msg: 'Something went wrong'}))
        }
    }

    @Post('/login')
    async login(req: LoginRequest, res:Response) {
        const result = new Result<LoginResult>()
        const validateRes = validateLogin(req.body)
        if (validateRes.hasError) {
            res.json(result.setCode(400).setError(validateRes.error))
            return
        }

        const { email, password } = req.body
        try {
            const user = await this.userService.findOne({
                where: {email}
            })

            if (!user || !user.username || !user.password || !user.id || !user.email) {
                res.json(result.setCode(404).setError({email: 'No email in record'}))
                return
            }

            if (!comparePassword(password, user.password)) {
                res.json(result.setCode(404).setError({msg: 'Email and Password do not match'}))
                return
            }

            const token = generateToken({
                id: user.id,
                username: user.username,
                email
            })

            res.json(result.setCode(200).setData({
                id: user.id,
                email: user.email,
                username: user.username,
                token
            }))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(404).setError({msg: 'Something went wrong'}))
        }
    }

    @Post('/token')
    decodeToken(req: Request, res: Response) {
        const {token} = req.body
        const result = new Result<LoginResult>()
        if (!token) {
            res.json(result.setCode(404).setError({msg: "Invalid Token"}))
            return
        }
        const user = decodeToken(token)
        if (!user) {
            res.json(result.setCode(404).setError({msg: "Invalid Token"}))
            return
        }
        res.json(result.setCode(200).setData({...user, token: (token as string)}))
    }
}
