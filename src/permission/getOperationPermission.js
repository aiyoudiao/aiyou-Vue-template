/**
 * 需求：将页面所有的权限数据获取到格式为 {key: value}
 * 操作：将一个树形对象扁平化，变成一个伪数组对象，从而可以通过key来直接获取value，一次深度优先遍历即可。
 * 注意：可能会多次调用，调用一次有，将数据存入内存里，每三十分钟调用次，重新更新操作权限。
 */

/**
 * 将树扁平化为对象
 * 取出树中页面的操作权限，以key:value的方式存储。
 * @param {*} obj
 * @param {*} tree
 */
export default function (obj, tree) {
    flatTreeToObj(obj, tree)
}

function flatTreeToObj(obj, treeList) {
    treeList.forEach(tree => {
        if (tree.name) {
            /* 判断该key是否已经存在了 */
            if (obj[tree.name]) {
                // console.log(obj[tree.name])
                throw new Error('菜单列表中每一项的name必须唯一。')
            }

            obj[tree.name] = tree.permission || []
        } else if (tree.children) {
            flatTreeToObj(obj, tree.children)
        }
    })
}
