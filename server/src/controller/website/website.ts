import {Controller, Get, Put, Use, Wired} from "../../pkg/dicorator/controller";
import {WebsiteService} from "../../service";
import {Request, Response} from "express";
import {authCheck} from "../../middleware/auth";
import {Result} from "../../pkg/helperClass/result";
import {Website} from "../../db/model";

@Controller('/website')
export class WebsiteController {
    @Wired
    private websiteService: WebsiteService

    @Get('/')
    async getWebsiteSettings(req: Request, res: Response) {
        const result = new Result()
        try {
            const settings = await this.websiteService.findOne({
                where: {
                    id: 1
                }
            })
            res.json(result.setCode(200).setData(settings))
        } catch (e) {
            res.json(result.setCode(400).setError({msg: "Something went wrong"}))
        }
    }

    @Put('/')
    @Use(authCheck)
    async updateWebsiteSettings(req: UpdateReq, res: Response) {
        const result = new Result()
        const {settings} = req.body
        try {
            const [affectedCount] = await this.websiteService.updateOne({
                data: settings,
                where: {
                    id: 1
                }
            })
            res.json(result.setCode(200).setData({affectedCount}))
        } catch (e) {
            res.json(result.setCode(400).setError({msg: "Something went wrong"}))
        }
    }
}

interface UpdateReq extends Request {
    body: {
        settings: Partial<Website>
    }
}