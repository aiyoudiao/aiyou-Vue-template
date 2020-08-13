let baseURL = ''
if (process.env.NODE_ENV === 'production') {
    baseURL = '/wechatmp'
} else {
    baseURL = ''
}

exports.getCompleteUrl = function getCompleteUrl(url) {
    if (url.indexOf('/') === 0) return baseURL + url

    return baseURL + '/' + url
}