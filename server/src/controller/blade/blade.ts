import {Controller, Del, Get, Post, Put, Use, Wired} from "../../pkg/dicorator/controller";
import {authCheck} from "../../middleware/auth";
import {BladeService} from "../../service";
import {Response} from "express";
import {Result} from "../../pkg/helperClass/result";
import {AllBladeRequest, CreateReq, SingleBladeReq, UpdateTowReq, UpdateWithAssociationReq} from "./type";
import {Blade} from "../../db/model";
import {currentDateTime} from "../../util/date";
import modelProvider from "../../pkg/helperClass/modelProvider";
import {Includeable} from "sequelize";
import {getDetailTableValue} from "../../util/defaultValue";
import {validatePostBlade} from "../../validators/blade";
import {firstLetterToUpper} from "../../util";

@Controller('/blades')
export class BladeController {
    @Wired
    private bladeService: BladeService

    @Get('/')
    async getAll(req: AllBladeRequest, res: Response) {
        const result = new Result()
        const { pageId } = req.query
        const parsedId = parseInt(pageId)
        if (isNaN(parsedId)) {
            res.json(result.setCode(400).setError({msg: 'No page id provided'}))
            return
        }
        try {
            const blades = await this.bladeService.findAll({
                where: {
                    pageId: parsedId
                },
                order: [
                    ['order']
                ],
            })
            res.json(result.setCode(200).setData(blades))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(400).setError({msg: 'Cannot get blades'}))
        }
    }

    @Put('/')
    @Use(authCheck)
    async updateTow(req: UpdateTowReq, res: Response) {
        const result = new Result()
        const {blade1, blade2} = req.body
        if (!blade1.id || !blade2.id) {
            res.json(result.setCode(400).setData({msg: 'id not provided'}))
            return
        }
        try {
            const num = await this.bladeService.updateTwo({
                data: {...blade1, id: undefined},
                where: {
                    id: blade1.id
                }
            }, {
                data: {...blade2, id: undefined},
                where: {
                    id: blade2.id
                }
            })
            res.json(result.setCode(200).setData({affectedCount: num}))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Post('/')
    @Use(authCheck)
    async createBlade(req: CreateReq, res: Response) {
        const result = new Result<Blade>()
        const validateRes = validatePostBlade(req.body.blade)
        if (validateRes.hasError) {
            res.json(result.setCode(400).setError(validateRes.error))
            return
        }

        const {blade} = req.body
        const now = currentDateTime()
        if (!blade.name) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
            return
        }

        const model = modelProvider.getModel(firstLetterToUpper(blade.name) + "Blade")

        if (!model) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
            return
        }

        try {
            const data = await this.bladeService.createOne({
                ...blade,
                createdAt: now,
                updatedAt: now,
                content: getDetailTableValue(blade.name)
            }, [
                model.constructor as Includeable
            ])
            if (data) {
                res.json(result.setCode(200).setData(data))
                return
            }
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Del('/:bladeType/:bladeId')
    @Use(authCheck)
    async deleteBlade(req: SingleBladeReq, res: Response) {
        const result = new Result<{affectedCount: number}>()
        const {bladeId, bladeType} = req.params
        try {
            const num = await this.bladeService.deleteAll(parseInt(bladeId), bladeType)
            if (num !== 0) {
                res.json(result.setCode(200).setData({affectedCount: num}))
                return
            }
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Get('/:bladeType/:bladeId')
    async getBlade(req: SingleBladeReq, res: Response) {
        const result = new Result<Partial<Blade>>()
        const {bladeId, bladeType} = req.params
        const bladeModel = modelProvider.getModel(`${firstLetterToUpper(bladeType)}Blade`)
        if (!bladeModel) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
            return
        }
        try {
            const blade = await this.bladeService.findOne({
                where: {
                    id: parseInt(bladeId)
                },
                include: [
                    bladeModel.constructor as Includeable
                ]
            })
            if (blade) {
                res.json(result.setCode(200).setData(blade))
                return
            }
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Put('/:bladeType/:bladeId')
    @Use(authCheck)
    async updateWithAssociation(req: UpdateWithAssociationReq, res: Response) {
        const result = new Result<{affectedCount: number}>()
        const {bladeId, bladeType} = req.params
        const {blade} = req.body

        try {
            const affectedCount = await this.bladeService.updateByWithAssociation(blade, parseInt(bladeId), bladeType)
            if (affectedCount !== 0) {
                res.json(result.setCode(200).setData({affectedCount}))
                return
            }
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        } catch (e) {
            console.error(e)
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }
}