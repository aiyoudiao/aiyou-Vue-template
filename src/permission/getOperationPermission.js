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

/* 递归的将一个数组转成了一个对象 */
function flatTreeTableToObj(obj, treeList) {
    treeList.forEach(tree => {
        if (tree.name) {
            /* 判断该key是否已经存在了 */
            if (obj[tree.name]) {
                // console.log(obj[tree.name])
                throw new Error('菜单列表中每一项的name必须唯一。')
            }

            obj[tree.name] = tree
        }

        if (!tree.name && tree.children) {
            obj[generateVName(tree.text, tree.type)] = tree
        }

        if (tree.children) {
            const tempChildren = tree.children
            tree.children = {}
            flatTreeTableToObj(tree.children, tempChildren)
        }
    })
}

/* 递归的将一个对象转换成一个数组 */
function flatObjToTreeTable(treeList, obj) {
    for (let item in obj) {
        treeList.push(obj[item])
        if (obj[item].children) {
            const tempChildren = obj[item].children
            obj[item].children = []
            flatObjToTreeTable(obj[item].children, tempChildren)
        }
    }
}

/* 递归的给树形表格中的节点添加属性 */
function addAttrToTreeTableNode(treeList, attrs) {
    treeList.forEach(tree => {
        for (let item in attrs) {
            tree[item] = attrs[item]
        }

        if (tree.children) {
            addAttrToTreeTableNode(tree.children, attrs)
        }
    })
}

/* 递归的检查一遍树形表格阶段的属性， 如果子节点都有这个属性，那么父节点也添加这个属性 */
function checkAttrToTreeAndParentNode(treeList, attrs) {
    let isAllAttr = true

    treeList.forEach(tree => {
        /* 先处理子节点 */
        if (tree.children) {
            isAllAttr = checkAttrToTreeAndParentNode(tree.children, attrs)

            /* 将子节点中的树形都设置一下 */
            for (var item in attrs) {
                tree[item] = isAllAttr
            }
        }

        for (var item in attrs) {
            if (tree[item] !== attrs[item]) {
                isAllAttr = false
                return isAllAttr
            }
        }
    })

    return isAllAttr
}

/* 获取处理完毕的树形表格 */
// export function getComplateTreeTable(treeTableAll, treeTableOne, attrs) {
//     debugger;

//     const treeTableAllObj = {};
//     const treeTableOneObj = {};

//     flatTreeTableToObj(treeTableAllObj, treeTableAll);
//     flatTreeTableToObj(treeTableOneObj, treeTableOne);

//     const treeTableObj = mergeTreeTable(treeTableAllObj, treeTableOneObj);

//     const treeTable = [];
//     flatObjToTreeTable(treeTable, treeTableObj);
//     addAttrToTreeTableNode(treeTable, attrs);

//     return treeTable;
// }

export function getComplateTreeTable(treeTableAll, treeTableOne, attrs) {
    // debugger
    addAttrToTreeTableNode(treeTableOne, attrs)

    const treeTableAllObj = {}
    const treeTableOneObj = {}

    flatTreeTableToObj(treeTableAllObj, treeTableAll)
    flatTreeTableToObj(treeTableOneObj, treeTableOne)

    const treeTableObj = mergeTreeTable(treeTableAllObj, treeTableOneObj)

    const treeTable = []
    flatObjToTreeTable(treeTable, treeTableObj)
    checkAttrToTreeAndParentNode(treeTable, attrs)

    return treeTable
}

/* 合并两个树形表格 */
function mergeTreeTable(treeTableAllObj, treeTableOneObj) {
    for (let item in treeTableOneObj) {
        if (treeTableAllObj[item].children) {
            const treeTable = mergeTreeTable(treeTableAllObj[item].children, treeTableOneObj[item].children)
            treeTableAllObj[item].children = treeTable
        } else {
            treeTableAllObj[item] = treeTableOneObj[item]
        }
    }

    return treeTableAllObj
}

/* 对于没有name树形的节点，通过它的text和type生成一个虚拟的name，方便查找 */
function generateVName(text = '', type = '') {
    return text + '|&-*-&|' + type
}

/* 判断这个节点的key是否是生成的虚拟name */
function isGenerateVName(key) {
    return ''.indexOf('|&-*-&|') > -1
}
