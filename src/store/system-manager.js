import {
    SYSTEM_USER_MANAGER,
    SYSTEM_ROLE_MANAGER,
    SYSTEM_MENU_MANAGER,
    SYSTEM_USER_MANAGER_ZHCN,
    SYSTEM_ROLE_MANAGER_ZHCN,
    SYSTEM_MENU_MANAGER_ZHCN,
} from '@constant/system-manager'

export default {
    text: '系统管理',
    type: 'ios-construct',
    children: [
        {
            type: 'ios-person',
            name: SYSTEM_USER_MANAGER,
            text: SYSTEM_USER_MANAGER_ZHCN,
            /* hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面 */
            // hidden: true,
            /* 页面里的操作权限 新增按钮、列表的每一项的详情、更新、删除按钮，你也可以添加其他的 */
            permission: ['insert', 'detail', 'update', 'delete'],
        },
        {
            type: 'md-rose',
            name: SYSTEM_ROLE_MANAGER,
            text: SYSTEM_ROLE_MANAGER_ZHCN,
            /* hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面 */
            // hidden: true,
            /* 页面里的操作权限 新增按钮、列表的每一项的详情、更新、删除按钮，你也可以添加其他的 */
            permission: ['insert', 'detail', 'update', 'delete'],
        },
        {
            type: 'md-color-palette',
            name: SYSTEM_MENU_MANAGER,
            text: SYSTEM_MENU_MANAGER_ZHCN,
            /* hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面 */
            // hidden: true,
            /* 页面里的操作权限 新增按钮、列表的每一项的详情、更新、删除按钮，你也可以添加其他的 */
            permission: ['insert', 'detail', 'update', 'delete'],
        },
    ],
}