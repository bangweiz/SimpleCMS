import {Page} from "./page";

export interface Blade {
    id: number
    name: BladeType
    pageId: number
    order: number
    createdAt: string
    updatedAt: string
    page?: Page
    content: Partial<Content>
}

export interface Content {
    id: number
    title: string
    subtitle?: string
    content: string
    bladeId: number
    buttonLink?: string
    buttonText?: string
}


export enum BladeType {
    NULL = '',
    CONTENT = 'content',
    BANNER = 'banner'
}