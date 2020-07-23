import Vue from 'vue'
import Vuex from 'vuex'

import Home from './home'
import SystemManager from './system-manager'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [

            Home,

            {
                text: '一级菜单',
                type: 'ios-paper',
                children: [
                    {
                        text: '二级菜单',
                        type: 'ios-paper',
                        hidden: true,
                        children: [
                            {
                                type: 'ios-notifications-outline',
                                name: 'msg',
                                text: '查看消息',
                                // hidden: true,
                            },
                            {
                                type: 'md-lock',
                                name: 'password',
                                text: '修改密码',
                                // hidden: true,
                            },
                            {
                                type: 'md-person',
                                name: 'userinfo',
                                text: '基本资料',
                                // hidden: true,
                            },
                        ],
                    },
                ],
            },
            SystemManager,
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
