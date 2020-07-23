const Mock = require('mockjs');
const SystemManager = require('../../src/common/urls/system-manager');
const { ROLE_MANAGER: { LIST_API, DETAIL_API, INSERT_API, UPDATE_API, REMOVE_API } } = SystemManager

const total = 115;


/**
 * @description	测试分页方法
 * @author aiyoudiao
 * @date 2020-04-18
 * @param {*} [query={}]
 * @returns 
 */
function getDataByGetMethod(query = {}) {
    const {
        pageNum = 1,
        pageSize = 10,
        roleName = '管理员',
        roleStatus,
        powerCode,
    } = query;

    const key = 'queryList|' + pageSize;

    return Mock.mock({
        pageSize,
        total,
        size: pageNum,
        summary: JSON.stringify({
            roleName,
            roleStatus,
            powerCode,
        }),
        // [key]
        'queryList | 10': [
            {

                roleId: '@id()',
                roleName: "@title() <--" + roleName,
                powerCode: ['guest', 'admin', 'administrator'][Mock.Random.integer(0, 2)],
                roleComments: "@cparagraph()",
                roleStatus: "0",
                createUserId: '@cname()',
                updateUserId: '@cname()',
                updateTime: '@datetime()',
                createTime: '@datetime()',

            },
        ],
    });
}


/**
 * @description	模拟真实的分页方法
 * @author aiyoudiao
 * @date 2020-04-18
 * @param {*} [body={}]
 * @returns 
 */
function getDataByPostMethod(body = {}) {
    const {
        pageNum = 1,
        pageSize = 10,
        roleName = '管理员',
        roleStatus,
        powerCode ,
    } = body;

    /* POST 方法多做点处理，因为要模拟真实的分页 */
    const remainCount = total - (pageNum - 1) * pageSize;
    const count = remainCount < pageSize && remainCount > 0 ? remainCount : pageSize

    const key = 'queryList|' + count;

    return Mock.mock({
        pageSize,
        total,
        size: pageNum,

        summary: JSON.stringify({
            roleName,
            roleStatus,
            powerCode,
        }),
        [key]: [
            {
                roleId: '@id()',
                roleName: "@title() <--" + roleName,
                powerCode: ['guest', 'admin', 'administrator'][Mock.Random.integer(0, 2)],
                roleComments: "@cparagraph()",
                roleStatus: "0",
                createUserId: '@cname()',
                updateUserId: '@cname()',
                updateTime: '@datetime()',
                createTime: '@datetime()',
            },
        ],
    });
}

module.exports = [
    {
        url: LIST_API,
        type: 'get',
        response: (req, res) => {
            const query = req.query;

            const data = getDataByGetMethod(query);

            return {
                query,
                code: '0',
                msg: '成功',
                data: data,
            };
        },
    },
    {
        url: LIST_API,
        type: 'post',
        response: (req, res) => {
            const query = req.query;
            const body = req.body;

            const data = getDataByPostMethod(body);

            return {
                body,
                //   query,
                code: '0',
                msg: '成功',
                data: data,
            };
        },
    },
];
