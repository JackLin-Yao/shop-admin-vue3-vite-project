/**
 * 路由配置信息
 */
// import Layout from '@/layout/index.vue''
// import {Login} from './module/login'
const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout/index.vue'),
  },
  { path: '/login', component: () => import('../views/login.vue') },
]

export default routes
