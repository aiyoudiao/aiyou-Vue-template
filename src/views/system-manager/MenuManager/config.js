// text, name,size, type, chidren,hidden,permission
/* column： 列表页面的表头字段集合 */
export const column = [
    // {
    //     title: '序号',
    //     key: 'serialNumber',
    //     // width: 70,
    //     fixed: 'left',
    //     // ellipsis: true,
    //     // tooltip: true,
    // },
    // {
    //     title: '菜单ID',
    //     key: 'menuId',
    //     hidden: true,
    //     // ellipsis: true,
    //     // tooltip: true,
    // },
    {
        title: '菜单文本',
        key: 'text',
        ellipsis: true,
        tooltip: true,
        tree: true,
        // minWidth: 120,
        width: 120,
        align: 'left',
        fixed: 'left',
        display: 'inline',
    },
    {
        title: '菜单名称',
        key: 'name',
        // width: 200,
        ellipsis: true,
        tooltip: true,

    },
    {
        title: '字体图标',
        key: 'type',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '字体图标大小',
        key: 'size',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '是否隐藏',
        key: 'hidden',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '权限',
        key: 'permission',
        ellipsis: true,
        tooltip: true,
    },
]

export const treeTable = [
    {
        name: 'home',
        size: 18,
        type: 'md-home',
        text: '主页',
        menuId: '100',
    },
    // {
    //     "text": "群消息管理",
    //     "type": "ios-paper",
    //     menuId: "101",
    //     "children": [{
    //         "type": "ios-grid",
    //         "name": "groupRecordQuery",
    //         "text": "群记录查询",
    //         menuId: "100100",
    //     },
    //     {
    //         "text": "三级菜单",
    //         "type": "ios-paper",
    //         "hidden": true,
    //         menuId: "100101",
    //         "children": [{
    //             "type": "ios-notifications-outline",
    //             "name": "msg",
    //             "text": "查看消息",
    //             menuId: "10010100",
    //         },
    //         {
    //             "type": "md-lock",
    //             "name": "password",
    //             "text": "修改密码",
    //             menuId: "10010101",
    //         },
    //         {
    //             "type": "md-person",
    //             "name": "userinfo",
    //             "text": "基本资料",
    //             menuId: "10010102",
    //         }]
    //     }]
    // },
    // {
    //     "text": "帮助信息管理",
    //     "type": "ios-paper",
    //     menuId: "102",
    //     "children": [{
    //         "type": "ios-grid",
    //         "name": "helpInformationQuery",
    //         "text": "帮助信息查询",
    //         menuId: "10200",
    //     }]
    // },
    {
        text: '系统管理',
        type: 'ios-construct',
        menuId: '103',
        children: [{
            type: 'ios-person',
            name: 'system-user-manager',
            text: '用户管理',
            permission: ['insert', 'detail', 'update', 'delete'],
            menuId: '10300',
        },
        {
            type: 'md-rose',
            name: 'system-role-manager',
            text: '角色管理',
            permission: ['insert', 'detail', 'update', 'delete'],
            menuId: '10301',
        },
        {
            type: 'md-color-palette',
            name: 'system-menu-manager',
            text: '菜单管理',
            permission: ['insert', 'detail', 'update', 'delete'],
            menuId: '10302',
        }],
    }]