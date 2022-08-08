/**
 * 路由配置信息
 */
// import Layout from '@/layout/index.vue''
// import {Login} from './module/login'
import NotFound from '@/views/NotFound.vue'
// import Index from '@/views/index.vue'
// import GoodList from '@/views/goods/list.vue'
import Layout from '@/layout/index.vue'
import Login from '@/views/login.vue'

// 默认路由，所有用户共享
const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录页',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default routes
