// text, name,size, type, chidren,hidden,permission
/* column： 列表页面的表头字段集合 */
export const column = [
    // {
    //     type: 'selection',
    //     width: 60,
    //     align: 'center'
    // },
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
        expand: true,
        render(h, target) {
            const { row, column, index } = target;
            // console.log("row: ", row);
            // console.log("column: ", column);
            // console.log("index: ", index);
            return h("span", row.text || "-");
        }
    },

    {
        title: '是否拥有',
        key: '_checked',
        ellipsis: true,
        tooltip: true,
        display: 'inline',
        render(h, target) {
            const { row, column, index } = target;
            // console.log("row: ", row);
            // console.log("column: ", column);
            // console.log("index: ", index);
            return h("span", row._checked || "-");
        }
    },

    {
        title: '菜单名称',
        key: 'name',
        // width: 200,
        ellipsis: true,
        tooltip: true,
        expand: true,
        render(h, target) {
            const { row, column, index } = target;
            
            // console.log("target", target);

            // console.log("row: ", row);
            // console.log("column: ", column);
            // console.log("index: ", index);

            return h("span", row.name || "-");
        }
    },
    {
        title: '字体图标',
        key: 'type',
        ellipsis: true,
        tooltip: true,
        expand: true,
        render(h, target) {
            const { row, column, index } = target;
            // console.log("row: ", row);
            // console.log("column: ", column);
            // console.log("index: ", index);
            return h("span", row.type || "-");
        }
    },
    {
        title: '字体图标大小',
        key: 'size',
        ellipsis: true,
        tooltip: true,
        expand: true,
        render(h, target) {
            const { row, column, index } = target;
            // console.log("row: ", row);
            // console.log("column: ", column);
            // console.log("index: ", index);
            return h("span", row.size || "-");
        }
    },
    {
        title: '是否隐藏',
        key: 'hidden',
        ellipsis: true,
        tooltip: true,
        expand: true,
        render(h, target) {
            const { row, column, index } = target;
            // console.log("row: ", row);
            // console.log("column: ", column);
            // console.log("index: ", index);


            return  h("span", row.hidden || "-");
        }
    },
    {
        title: '权限',
        key: 'permission',
        ellipsis: true,
        tooltip: true,
        expand: true,
        render(h, target) {
            const { row, column, index } = target;
            // console.log("row: ", row);
            // console.log("column: ", column);
            // console.log("index: ", index);

            return h("span", row.permission || "-");

        }
    },
]


/* treeRoot：树根，也就是左侧的角色树 */
export const treeRoot = [
    {
        title: '全部角色',
        expand: true,
        isRoot: true,
        selected: true,
        render: (h, { root, node, data }) => h(
            'span',
            {
                style: {
                    display: 'inline-block',
                    width: '20%',
                },
            },
            [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-folder-outline',
                        },
                        style: {
                            marginRight: '8px',
                        },
                    }),
                    h('span', data.title),
                ]),
                h(
                    'span',
                    {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px',
                        },
                    },
                    [],
                ),
            ],
        ),
        children: [
            {
                title: '访客',
                meta: {

                    menu: [
                        {
                            name: 'home',
                            size: 18,
                            type: 'md-home',
                            text: '主页',
                            menuId: '100',
                        }
                    ]
                }
            },
            {
                title: '管理员',
                meta: {

                    menu: [
                        {
                            name: 'home',
                            size: 18,
                            type: 'md-home',
                            text: '主页',
                            menuId: '100',
                        },
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
                            }],
                        }]
                }
            },
            {
                title: '超级管理员',
                meta: {
                        
                    menu:[
                        {
                            name: 'home',
                            size: 18,
                            type: 'md-home',
                            text: '主页',
                            menuId: '100',
                        },
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
                }
            },
        ],
    },
];

/* treeTable：树表格，右侧的树形菜单，应该是动态切换的。*/
/* 选择全部角色时，显示所有的treeTable行。 */
/**
 * 选择某个角色时，有两种方案
 * 1. 只显示对应的部分treeTable
 * 2. 对比，然后填充相应的数据到所有treeTable中去
 */
export const treeTable = [
    {
        name: 'home',
        size: 18,
        type: 'md-home',
        text: '主页',
        menuId: '100',
    },
    {
        text: '一级菜单',
        type: 'ios-paper',
        hidden: true,
        menuId: '102',
        children: [
            {
                text: '二级菜单',
                type: 'ios-paper',
                hidden: true,
                menuId: '10100',
                children: [
                    {
                        type: 'ios-notifications-outline',
                        name: 'msg',
                        text: '查看消息',
                        menuId: '10100101',
                        // hidden: true,
                    },
                    {
                        type: 'md-lock',
                        name: 'password',
                        text: '修改密码',
                        menuId: '10100102',
                        // hidden: true,
                    },
                    {
                        type: 'md-person',
                        name: 'userinfo',
                        text: '基本资料',
                        menuId: '10100103',
                        // hidden: true,
                    },
                ],
            },
        ],
    },

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