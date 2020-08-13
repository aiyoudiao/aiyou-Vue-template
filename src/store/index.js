/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-08 21:04:57
 * @LastEditTime: 2020-08-09 22:10:34
 * @LastEditors: aiyoudiao
 * @FilePath: \web-fornt\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

import Home from './home'
import SystemManager from './system-manager'
import BusinessManager from './business-manager'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [

            Home,

            // {
            //     text: '一级菜单',
            //     type: 'ios-paper',
            //     hidden: false,
            //     children: [
            //         {
            //             text: '二级菜单',
            //             type: 'ios-paper',
            //             hidden: false,
            //             children: [
            //                 {
            //                     type: 'ios-notifications-outline',
            //                     name: 'msg',
            //                     text: '查看消息',
            //                     // hidden: true,
            //                 },
            //                 {
            //                     type: 'md-lock',
            //                     name: 'password',
            //                     text: '修改密码',
            //                     // hidden: true,
            //                 },
            //                 {
            //                     type: 'md-person',
            //                     name: 'userinfo',
            //                     text: '基本资料',
            //                     // hidden: true,
            //                 },
            //             ],
            //         },
            //     ],
            // },
            // SystemManager,
            BusinessManager,
        ],

        // 所有页面的操作权限
        pageOperationPermissions: {},

    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setPageOperationPermissions(state, obj) {
            state.pageOperationPermissions = { ...obj }
        },
    },
})

export default store
