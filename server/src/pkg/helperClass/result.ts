export class Result<T> {
    private code: number
    private data: T
    private error: {[key: string]: string}

    public constructor()
    public constructor(code: number, data: T, error: {[key: string]: string})
    public constructor(code?: number, data?: T, error?: {[key: string]: string}) {
        if (code) this.code = code
        if (data) this.data = data
        if (error) this.error = error
    }

    public setCode(code: number) {
        this.code = code
        return this
    }

    public setData(data: T) {
        this.data = data
        return this
    }

    public setError(error: {[key: string]: string}) {
        this.error = error
        return this
    }
}
