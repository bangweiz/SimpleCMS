export const formatDateTime = (datetime: string): string => {
    const date = new Date(datetime)
    const dateString = date.toLocaleString()
    const dateAndTime = dateString.split(',')
    const d = dateAndTime[0].split('/').reverse()
    return d.join('-') + dateAndTime[1]
}