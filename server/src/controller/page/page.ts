import {Controller, Del, Get, Post, Put, Wired, Use} from "../../pkg/dicorator/controller";
import {Request, Response} from "express";
import {authCheck} from "../../middleware/auth";
import {PageService} from "../../service";
import {Result} from "../../pkg/helperClass/result";
import {CreatePageRequest, DeletePageReq, UpdatePageRequest} from "./type";
import {Blade, Page, User} from "../../db/model";
import {currentDateTime} from "../../util/date";
import {sanitizeObject} from "../../util/utils";
import {validatePostPage} from "../../validators/page";
import {Op} from "sequelize";

@Controller('/pages')
export class PageController {
    @Wired
    private pageService: PageService
    
    @Get('/:pageId')
    async getOne(req: Request, res: Response) {
        const result = new Result<Partial<Page>>()
        const {pageId} = req.params

        const parsedId = parseInt(pageId as string)
        if (isNaN(parsedId)) {
            res.json(result.setCode(400).setError({msg: 'No page id provided'}))
            return
        }
        try {
            const page = await this.pageService.findOne({
                where: {id: parsedId},
                include: [
                    {
                        model: Blade,
                    },
                    {
                        model: User,
                        attributes: ['username', 'id']
                    }
                ],
                order: [
                    [Blade, 'order']
                ]
            })
            if (page) {
                res.json(result.setCode(200).setData(page))
                return
            }
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        } catch (e) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Get("/")
    async getAll(req: Request, res: Response) {
        const result = new Result<Partial<Page>[]>()
        try {
            const pages = await this.pageService.findAll({})
            res.json(result.setCode(200).setData(pages))
        } catch (e) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Post("/")
    @Use(authCheck)
    async createOne(req: CreatePageRequest, res: Response) {
        const result = new Result<Partial<Page>>()
        const validateRes = validatePostPage(req.body.page)
        if (validateRes.hasError) {
            res.json(result.setCode(400).setError(validateRes.error))
            return
        }

        const { page: pageData } = req.body
        const now = currentDateTime()
        try {
            const p = await this.pageService.findOne({
                where: {
                    url: pageData.url || ''
                }
            })

            if (p) {
                validateRes.addFieldError('url', 'This url has been in used')
                res.json(result.setCode(400).setError(validateRes.error))
                return
            }

            const page = await this.pageService.createOne({
                ...pageData,
                createdAt: now,
                updatedAt: now
            })
            if (!page) {
                res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
                return
            }
            res.json(result.setCode(200).setData(page))
        } catch (e) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Put("/:pageId")
    @Use(authCheck)
    async update(req: UpdatePageRequest, res: Response) {
        const result = new Result()
        const validateRes = validatePostPage(req.body.page)
        if (validateRes.hasError) {
            res.json(result.setCode(400).setError(validateRes.error))
            return
        }

        const {page} = req.body
        const {pageId} = req.params
        const now = currentDateTime()
        try {
            const p = await this.pageService.findOne({
                where: {
                    [Op.and]: [
                        {url: page.url || ''},
                        {id: {[Op.not]: parseInt(pageId)}}
                    ]
                }
            })

            if (p) {
                validateRes.addFieldError('url', 'This url has been in used')
                res.json(result.setCode(400).setError(validateRes.error))
                return
            }

            const [affectedCount] = await this.pageService.updateOne({
                data: {
                    ...page,
                    updatedAt: now
                },
                where: {
                    id: parseInt(pageId)
                }
            })
            if (affectedCount === 1) {
                res.json(result.setCode(200).setData({affectedCount}))
                return
            }
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        } catch (e) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }

    @Del("/:pageId")
    @Use(authCheck)
    async deletePage(req: DeletePageReq, res: Response) {
        const result = new Result()
        const {pageId} = req.params
        try {
            const affectedCount = await this.pageService.deleteById(parseInt(pageId))
            if (affectedCount == 1) {
                res.json(result.setCode(200).setData({affectedCount}))
                return
            }
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        } catch (e) {
            res.json(result.setCode(400).setError({msg: 'Something went wrong'}))
        }
    }
}