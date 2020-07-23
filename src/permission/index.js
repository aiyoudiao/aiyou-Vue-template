import { LoadingBar } from 'view-design'
import router from '@/router'
import store from '@/store'
import { getDocumentTitle, resetTokenAndClearUser } from '@common/utils'
import createRoutes from './createRoutes'
import flatTreeToObj from './getOperationPermission'

// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
    document.title = getDocumentTitle(to.meta.title)
    LoadingBar.start()
    if (localStorage.getItem('token')) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else if (hasMenus) {
            next()
        } else {
            try {
                // 这里可以用 await 配合请求后台数据来生成路由
                // const data = await axios.get('xxx')
                // const routes = createRoutes(data)
                const routes = createRoutes(store.state.menuItems)
                console.log(routes)
                // 动态添加路由
                router.addRoutes(routes)
                /* 动态获取页面操作权限, 并存储到store中 */
                const obj = {}
                flatTreeToObj(obj, store.state.menuItems)
                console.log(store.state.menuItems && JSON.stringify([...store.state.menuItems]))
                store.commit('setPageOperationPermissions', obj)

                hasMenus = true
                next({ path: to.path || '/' })
            } catch (error) {
                resetTokenAndClearUser()
                next(`/login?redirect=${to.path}`)
            }
        }
    } else {
        hasMenus = false
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    LoadingBar.finish()
})
