import {Request} from "express";
import {Blade} from "../../db/model";

export interface AllBladeRequest extends Request {
    query: {
        pageId: string
    }
}

export interface UpdateTowReq extends Request {
    body: {
        blade1: Partial<Blade>
        blade2: Partial<Blade>
    }
}

export interface CreateReq extends Request {
    body: {
        blade: Partial<Blade>
    }
}

export interface SingleBladeReq extends Request {
    params: {
        bladeId: string,
        bladeType: keyof Blade
    }
}

export interface UpdateWithAssociationReq extends Request {
    params: {
        bladeId: string,
        bladeType: keyof Blade
    }
    body: {
        blade: Partial<Blade>
    }
}

