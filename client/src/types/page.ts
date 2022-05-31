import {User} from "./auth";
import {Blade} from "./blade";

export interface RawPage {
    id: number
    title: string
    userId: number
    url: string
    status: PageStatus
    createdAt: string
    updatedAt: string
}

export interface Page extends RawPage{
    user: User
    blades: Blade[]
}

export enum PageStatus {
    PUBLISHED,
    PRIVATE,
    DRAFT,
    TRASH
}
