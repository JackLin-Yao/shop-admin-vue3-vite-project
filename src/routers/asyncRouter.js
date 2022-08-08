import Index from '@/views/index.vue'
import GoodList from '@/views/goods/list.vue'
import CategoryList from '@/views/category/list.vue'
import UserList from '@/views/user/list.vue'
import OrderList from '@/views/order/list.vue'
import CommentList from '@/views/comment/list.vue'
import ImageList from '@/views/image/list.vue'
import NoticeList from '@/views/notice/list.vue'
import SettingBase from '@/views/setting/base.vue'
import CouponList from '@/views/coupon/list.vue'
import ManagerList from '@/views/manager/list.vue'
import AccessList from '@/views/access/list.vue'
import RoleList from '@/views/role/list.vue'
import SkusList from '@/views/skus/list.vue'
import LevelList from '@/views/level/list.vue'
import SettingBuy from '@/views/setting/buy.vue'
import SettingShip from '@/views/setting/ship.vue'
import DistributionIndex from '@/views/distribution/index.vue'
import DistributionSetting from '@/views/distribution/setting.vue'

// 动态路由，用于匹配菜单动态添加路由
export const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: Index,
    meta: {
      title: '后台首页',
    },
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodList,
    meta: {
      title: '商品管理',
    },
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: CategoryList,
    meta: {
      title: '分类列表',
    },
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: UserList,
    meta: {
      title: '用户列表',
    },
  },
  {
    path: '/order/list',
    name: '/order/list',
    component: OrderList,
    meta: {
      title: '订单列表',
    },
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: CommentList,
    meta: {
      title: '评价列表',
    },
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: ImageList,
    meta: {
      title: '图库列表',
    },
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: NoticeList,
    meta: {
      title: '公告列表',
    },
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: SettingBase,
    meta: {
      title: '配置',
    },
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: CouponList,
    meta: {
      title: '优惠券列表',
    },
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: ManagerList,
    meta: {
      title: '管理员列表',
    },
  },
  {
    path: '/access/list',
    name: '/access/list',
    component: AccessList,
    meta: {
      title: '菜单权限管理',
    },
  },
  {
    path: '/role/list',
    name: '/role/list',
    component: RoleList,
    meta: {
      title: '菜单权限管理',
    },
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    component: SkusList,
    meta: {
      title: '规格管理管理',
    },
  },
  {
    path: '/level/list',
    name: '/level/list',
    component: LevelList,
    meta: {
      title: '会员等级',
    },
  },
  {
    path: '/setting/buy',
    name: '/setting/buy',
    component: SettingBuy,
    meta: {
      title: '支付设置',
    },
  },
  {
    path: '/setting/ship',
    name: '/setting/ship',
    component: SettingShip,
    meta: {
      title: '物流设置',
    },
  },
  {
    path: '/distribution/index',
    name: '/distribution/index',
    component: DistributionIndex,
    meta: {
      title: '分销员管理',
    },
  },
  {
    path: '/distribution/setting',
    name: '/distribution/setting',
    component: DistributionSetting,
    meta: {
      title: '分销设置',
    },
  },
]


