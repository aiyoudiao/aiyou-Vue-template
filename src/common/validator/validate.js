/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-19 16:08:52
 * @LastEditTime: 2020-04-19 16:08:56
 * @LastEditors: aiyoudiao
 * @FilePath: \src\common\validor.js
 */

export const validateNotEmpty = (rule, value, callback) => {
    if ((value + '').trim() === '') {
        callback(new Error('该字段不能为空'))
    } else {
        callback()
    }
}

export const validateNot = (rule, value, callback) => {
    callback()
}