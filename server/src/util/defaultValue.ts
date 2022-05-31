import {ContentBlade} from "../db/model";

const content: Partial<ContentBlade> = {
    title: 'DEFAULT TITLE',
    content: 'DEFAULT CONTENT'
}

export const getDetailTableValue = (bladeType: string) => {
    return content
}