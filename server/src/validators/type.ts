export class ValidateResult {
    private _hasError: boolean
    private _error: {[key: string]: string}

    public constructor() {
        this._hasError = false
        this._error = {}
    }

    public get hasError() {
        return this._hasError
    }

    public get error() {
        return this._error
    }

    public addFieldError(field: string, msg: string) {
        this._hasError = true
        this._error[field] = msg
    }

    public addGlobalError(msg: string) {
        this._hasError = true
        this._error.msg = msg
    }

    public addRequiredError(field: string) {
        this._hasError = true
        this._error[field.replace(' ','_')] = `The ${field} field is required`
    }
}
