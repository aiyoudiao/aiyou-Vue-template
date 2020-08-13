import axios from 'axios'
// 设置请求超时时间
axios.defaults.timeout = 5000

let http = axios.create({
    baseURL: '',
    // withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    // },
    // transformRequest: [
    //     data => data,
    //     function (data) {
    //         let newData = ''
    //         console.log(Object.keys, typeof Object.keys)
    //         Object.keys(data).forEach(k => {
    //             newData
    //             += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    //         })

    //         return newData
    //     },
    // ],
})

function apiAxios(method, url, params) {
    return http({
        method,
        url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    })
}

export default {
    get(url, params) {
        return apiAxios('GET', url, params)
    },
    post(url, params) {
        return apiAxios('POST', url, params)
    },
    put(url, params) {
        return apiAxios('PUT', url, params)
    },
    delete(url, params) {
        return apiAxios('DELETE', url, params)
    },
}
