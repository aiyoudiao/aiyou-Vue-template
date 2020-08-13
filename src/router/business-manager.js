/**
 * NOTE 异步的组件有个弊病，你的import方法中必须写全字符串，
 * 不能使用变量，否则打包的时候不会去打包那个组件为一个js文件。
 */

import {
    BUSINESS_SHOP_MANAGER,
    BUSINESS_WORKERS_MANAGER,
    BUSINESS_GOODS_MANAGER,
    BUSINESS_SHOP_MANAGER_ZHCN,
    BUSINESS_WORKERS_MANAGER_ZHCN,
    BUSINESS_GOODS_MANAGER_ZHCN,
} from '@constant/business-manager'

export default {
    [BUSINESS_SHOP_MANAGER]: {
        path: BUSINESS_SHOP_MANAGER,
        name: BUSINESS_SHOP_MANAGER,
        meta: { title: BUSINESS_SHOP_MANAGER_ZHCN },
        component: () => import('../views/business-manager/ShopManager/index.vue'),
    },
    [BUSINESS_WORKERS_MANAGER]: {
        path: BUSINESS_WORKERS_MANAGER,
        name: BUSINESS_WORKERS_MANAGER,
        meta: { title: BUSINESS_WORKERS_MANAGER_ZHCN },
        component: () => import('../views/business-manager/WorkersManager/index.vue'),
    },
    [BUSINESS_GOODS_MANAGER]: {
        path: BUSINESS_GOODS_MANAGER,
        name: BUSINESS_GOODS_MANAGER,
        meta: { title: BUSINESS_GOODS_MANAGER_ZHCN },
        component: () => import('../views/business-manager/GoodsManager/index.vue'),
    },
}