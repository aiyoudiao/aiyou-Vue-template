/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-19 02:22:52
 * @LastEditTime: 2020-08-19 02:50:11
 * @LastEditors: aiyoudiao
 * @FilePath: \aiyou-Vue-template\src\router\big-screen.js
 */
/**
 * NOTE 异步的组件有个弊病，你的import方法中必须写全字符串，
 * 不能使用变量，否则打包的时候不会去打包那个组件为一个js文件。
 */

import {
    BIG_SCREEN,
    BIG_SCREEN_ZHCN,
    BIG_SCREEN_INDEX,
    BIG_SCREEN_INDEX_ZHCN,
} from '@constant/big-screen'

export default {
    [BIG_SCREEN]: {
        path: BIG_SCREEN,
        name: BIG_SCREEN,
        meta: { title: BIG_SCREEN_ZHCN },
        component: () => import('../views/big-screen/index.vue'),
    },
}