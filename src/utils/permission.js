import { router } from '@/routers/index.js'
import { getToken } from '@/composables/auth'
import { toast, showFullLoading, hideFullLoading } from '@/composables/utils'
import store from '@/store/index.js'
// 全局前置导航守卫，路径变化会先走这一步先，类似于拦截器

router.beforeEach(async (to, from, next) => {
  // console.log('前置守卫')
  // console.log(to, from)
  showFullLoading()
  const token = getToken()
  // 没有登录就强制跳转为登录页
  if (!token && to.path != '/login') {
    toast('请先登录', 'error')
    return next({ path: '/login' })
  }
  // 防止重复登录
  if (token && to.path == '/login') {
    // 重复拦截成功
    toast('请勿重复登录', 'error')
    return next({ path: from.path ? from.path : '/' })
  }

  // 如果用户登录了，自动获取用户信息，并存储在vuex当中
  //解决刷新后页面的用户信息就木有了的问题
  if (token) {
    await store.dispatch('getinfo')
  }

  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : '') + '-商城后台管理系统'
  document.title = title
  next()
})

// 全局后置守卫：页面渲染完发生的动作，它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用

router.afterEach((route) => {
  hideFullLoading()
})
