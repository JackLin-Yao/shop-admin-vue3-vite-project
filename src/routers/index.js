import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router.config'
import { asyncRoutes } from './asyncRouter'

/**
 *
 */

// 动态路由

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) => {
    // 把menus数组里面的每一个对象拿出来进行一次操作
    arr.forEach((e) => {
      // e.frontpath是菜单的一个路径，拿这个路径进行跟动态路由进行匹配，
      let item = asyncRoutes.find((o) => o.path == e.frontpath)
      // router.hasRoute()：检查路由是否存在。
      if (item && !router.hasRoute(item.path)) {
        // 添加嵌套路由：可以将路由的 name 作为第一个参数传递给 router.addRoute()，这将有效地添加路由
        router.addRoute('layout', item)
        hasNewRoutes = true
      }
      // 添加子路由
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }

  findAndAddRoutesByMenus(menus)
  // console.log(router.getRoutes())

  return hasNewRoutes
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
