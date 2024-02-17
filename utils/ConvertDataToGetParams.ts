export const ConvertDataToGetParams = (obj: Record<string, any>) => {
    const queryString = Object.keys(obj)
        .map(key => {
            const val = obj[key]
            if (val !== undefined) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            }
        })
        .join('&');
    return `?${queryString}`;
}