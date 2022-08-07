/**
 * 路由配置信息
 */
// import Layout from '@/layout/index.vue''
// import {Login} from './module/login'
import NotFound from '@/views/NotFound.vue'
import Index from '@/views/index.vue'
const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: '/',
        component: Index
      },
    ],
  },
  { path: '/login', component: () => import('@/views/login.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

export default routes
