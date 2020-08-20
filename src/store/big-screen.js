/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-19 02:22:14
 * @LastEditTime: 2020-08-19 02:49:25
 * @LastEditors: aiyoudiao
 * @FilePath: \aiyou-Vue-template\src\store\big-screen.js
 */
import {
    BIG_SCREEN,
    BIG_SCREEN_ZHCN,
} from '@constant/big-screen'

export default {
    text: '运营数据大屏',
    /* <Icon type="md-analytics" /> */
    /* <Icon type="ios-speedometer" /> */
    type: 'ios-speedometer',
    children: [
        {
            type: 'md-analytics',
            name: BIG_SCREEN,
            text: BIG_SCREEN_ZHCN,
            /* hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面 */
            // hidden: true,
            /* 页面里的操作权限 新增按钮、列表的每一项的详情、更新、删除按钮，你也可以添加其他的 */
            // permission: ['insert', 'detail', 'update', 'delete'],
        },
    ],
}