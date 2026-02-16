const urlResolver = (url: string) => {
    if (url.startsWith('/'))
        return import.meta.env.BASE_URL + url.slice(1)
    return url
}

export {
    urlResolver
}