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
    {
        title: '角色ID',
        key: 'roleId',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '角色名',
        key: 'roleName',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '权限码',
        key: 'powerCode',
        // width: 200,
        ellipsis: true,
        tooltip: true,

    },
    {
        title: '角色状态',
        key: 'roleStatus',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '创建人ID',
        key: 'createUserId',
        // ellipsis: true,
        // tooltip: true,
    },
    {
        title: '创建时间',
        key: 'createTime',
        // ellipsis: true,
        // tooltip: true,
    },
    {
        title: '更新人ID',
        key: 'updateUserId',
        // ellipsis: true,
        // tooltip: true,
    },
    {
        title: '更新时间',
        key: 'updateTime',
        // ellipsis: true,
        // tooltip: true,
    },
]

/* form 列表页面的表单文本 字典 例如一些 label、placeholder */
/* 暂时不把这个字段弄的那么复杂，等之后有必要，再进行重构 */
// export const form = {
//     userName: {
//         label
//     }
// }
