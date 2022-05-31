export const currentDateTime = (): string => {
    const dateTime = new Date().toLocaleString()
    const temp = dateTime.split(',')
    const date = temp[0].split('/').reverse()
    return date.join('-') + temp[1]
}