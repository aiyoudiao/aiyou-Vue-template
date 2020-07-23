/**
 * NOTE 异步的组件有个弊病，你的import方法中必须写全字符串，
 * 不能使用变量，否则打包的时候不会去打包那个组件为一个js文件。
 */

import {
    SYSTEM_USER_MANAGER,
    SYSTEM_ROLE_MANAGER,
    SYSTEM_MENU_MANAGER,
    SYSTEM_USER_MANAGER_ZHCN,
    SYSTEM_ROLE_MANAGER_ZHCN,
    SYSTEM_MENU_MANAGER_ZHCN,
} from '@constant/system-manager'

const PREFIX = '../views/system-manager'
export default {
    [SYSTEM_USER_MANAGER]: {
        path: SYSTEM_USER_MANAGER,
        name: SYSTEM_USER_MANAGER,
        meta: { title: SYSTEM_USER_MANAGER_ZHCN },
        component: () => import('../views/system-manager/UserManager/index.vue'),
    },
    [SYSTEM_ROLE_MANAGER]: {
        path: SYSTEM_ROLE_MANAGER,
        name: SYSTEM_ROLE_MANAGER,
        meta: { title: SYSTEM_ROLE_MANAGER_ZHCN },
        component: () => import('../views/system-manager/RoleManager/index.vue'),
    },
    [SYSTEM_MENU_MANAGER]: {
        path: SYSTEM_MENU_MANAGER,
        name: SYSTEM_MENU_MANAGER,
        meta: { title: SYSTEM_MENU_MANAGER_ZHCN },
        component: () => import('../views/system-manager/MenuManager/index.vue'),
    },
}