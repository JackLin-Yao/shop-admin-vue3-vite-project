import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router.config'
import { asyncRoutes } from './asyncRouter'

/**
 *
 */




// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute("admin", item)
                hasNewRoutes = true
            }
            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)
    console.log(router.getRoutes())

    return hasNewRoutes
}



 export const router = createRouter({
   history: createWebHashHistory(),
   routes,
 })