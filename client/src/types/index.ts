export interface BaseRes<T> {
    code: number
    error?: {[key: string]: string},
    data?: T
}
