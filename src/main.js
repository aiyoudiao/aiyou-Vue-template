/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-19 02:11:35
 * @LastEditTime: 2020-08-19 05:07:24
 * @LastEditors: aiyoudiao
 * @FilePath: \aiyou-Vue-template\src\main.js
 */
import Vue from 'vue'

import axios from 'axios'
import ViewUI from 'view-design'
// import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VeLine from 'v-charts/lib/line.common'
import dataV from '@jiaminghi/data-view'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'

Vue.use(dataV)
Vue.component(VeLine.name, VeLine)

Vue.config.productionTip = false
Vue.use(ViewUI)
// Vue.use(VueAxios, axios)
Vue.use(VueCookie)

// 设置基础URL
// axios.defaults.baseURL = 'http://localhost:8989'

// 设置请求超时时间
axios.defaults.timeout = 3000

/* {code: 0, data: '', message: ''} */
// axios.interceptors.request.use((request) => {
//     /* loading、请求地址的替换、修改等等 */
//     const req = 'loading'
//     console.log(req + '...@')
//     return request
// })
// axios.interceptors.request.use((request) => request)
// /* loading、请求地址的替换、修改等等 */

// axios.interceptors.response.use(
//     /* 业务代码 */
//     response => {
//         const res = response.data
//         /* 业务相关的错误、响应结果的处理 */
//         if (res.code !== 0) {
//             // console.log(`res.message ${res.message}`)
//         }
//         return response
//     },
//     /* 网络请求相关的错误机制 */
//     reason => Promise.reject(reason),
// )

Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
