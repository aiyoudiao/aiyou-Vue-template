/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-08 22:15:32
 * @LastEditTime: 2020-08-10 18:13:34
 * @LastEditors: aiyoudiao
 * @FilePath: \web-fornt\src\common\urls\business-manager.js
 */
const { getCompleteUrl } = require('./url-helper')

module.exports = {
    SHOP_MANAGER: {
        LIST_API: getCompleteUrl('/business/shop/getShopList'),
        DETAIL_API: getCompleteUrl('/business/shop/getShop'),
        INSERT_API: getCompleteUrl('/business/shop/insertShop'),
        UPDATE_API: getCompleteUrl('/business/shop/updateShop'),
        REMOVE_API: getCompleteUrl('/business/shop/deleteShop'),
    },
    WORKERS_MANAGER: {
        LIST_API: getCompleteUrl('/business/workers/getWorkersList'),
        SELECET_LIST_API: getCompleteUrl('/business/workers/getShopSelectList'),
        DETAIL_API: getCompleteUrl('/business/workers/getWorkers'),
        INSERT_API: getCompleteUrl('/business/workers/insertWorkers'),
        UPDATE_API: getCompleteUrl('/business/workers/updateWorkers'),
        REMOVE_API: getCompleteUrl('/business/workers/deleteWorkers'),
    },
    GOODS_MANAGER: {
        LIST_API: getCompleteUrl('/business/goods/getGoodsList'),
        SELECET_LIST_API: getCompleteUrl('/business/goods/getShopSelectList'),
        DETAIL_API: getCompleteUrl('/business/goods/getGoods'),
        INSERT_API: getCompleteUrl('/business/goods/insertGoods'),
        UPDATE_API: getCompleteUrl('/business/goods/updateGoods'),
        REMOVE_API: getCompleteUrl('/business/goods/deleteGoods'),
    },
}