export const sanitizeObject = <T extends {[key: string]: unknown}> (data?: T): Partial<T> => {
    if (!data) {
        return {}
    }
    const res = {...data}
    Object.keys(res).forEach(key => {
        if (!res[key] && res[key] !== '') {
            delete res[key]
        }
    })
    return res
}

export const validateEmail = (email: string): boolean => {
    return !!email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};