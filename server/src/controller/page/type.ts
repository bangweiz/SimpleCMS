import {Request} from "express";
import {Page} from "../../db/model";

export interface CreatePageRequest extends Request {
    body: {
        page: Partial<Page>
    }
}

export interface UpdatePageRequest extends Request {
    body: {
        page: Partial<Page>
    },
    params: {
        pageId: string
    }
}

export interface DeletePageReq extends Request {
    params: {
        pageId: string
    }
}

export enum PageStatus {
    PUBLISHED,
    PRIVATE,
    DRAFT,
    TRASH
}