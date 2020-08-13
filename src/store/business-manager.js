import {
    BUSINESS_SHOP_MANAGER,
    BUSINESS_WORKERS_MANAGER,
    BUSINESS_GOODS_MANAGER,
    BUSINESS_SHOP_MANAGER_ZHCN,
    BUSINESS_WORKERS_MANAGER_ZHCN,
    BUSINESS_GOODS_MANAGER_ZHCN,
} from '@constant/business-manager'

export default {
    text: '商业管理',
    type: 'logo-yen',
    children: [
        {
            type: 'ios-medal',
            name: BUSINESS_SHOP_MANAGER,
            text: BUSINESS_SHOP_MANAGER_ZHCN,
            /* hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面 */
            // hidden: true,
            /* 页面里的操作权限 新增按钮、列表的每一项的详情、更新、删除按钮，你也可以添加其他的 */
            permission: ['insert', 'detail', 'update', 'delete'],
        },
        {
            type: 'md-body',
            name: BUSINESS_WORKERS_MANAGER,
            text: BUSINESS_WORKERS_MANAGER_ZHCN,
            /* hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面 */
            // hidden: true,
            /* 页面里的操作权限 新增按钮、列表的每一项的详情、更新、删除按钮，你也可以添加其他的 */
            permission: ['insert', 'detail', 'update', 'delete'],
        },
        {
            type: 'ios-basket',
            name: BUSINESS_GOODS_MANAGER,
            text: BUSINESS_GOODS_MANAGER_ZHCN,
            /* hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面 */
            // hidden: true,
            /* 页面里的操作权限 新增按钮、列表的每一项的详情、更新、删除按钮，你也可以添加其他的 */
            permission: ['insert', 'detail', 'update', 'delete'],
        },
    ],
}