<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <!-- 标签页部分 -->
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-remove="removeTab"
      @tab-change="changeTab"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/'"
      >
      </el-tab-pane>
    </el-tabs>

    <!-- 下拉菜单部分 -->
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '@/routers/index'
const route = useRoute()
const cookie = useCookies()
let activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path: '/',
  },
  {
    title: '商城管理',
    path: '/goods/list',
  },
])

// 初始化标签导航，刷新页面不会丢失tab列表项，从cookie上面拿到对应的·值
// 初始化标签导航列表
function initTabList() {
  let tbs = cookie.get('tabList')
  if (tbs) {
    tabList.value = tbs
  }
}
initTabList()

//移除tab列表项
const removeTab = (t) => {
  // 获取tabList，a代表激活的tab
  let tabs = tabList.value
  let a = activeTab.value
  if (a == t) {
    // tab当前导航的一个对象
    tabs.forEach((tab, index) => {
      // 如果是激活的tab，则设置下一个tab为激活的tab
      if (tab.path == t) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        // 如果没有下一个tab，则设置第一个tab为激活的tab
        if (nextTab) {
          a = nextTab.path
        }
      }
    })
  }

  activeTab.value = a
  tabList.value = tabList.value.filter((tab) => tab.path != t)

  // 更新tabList
  cookie.set('tabList', tabList.value)
}
// 监听路由
onBeforeRouteUpdate((to, from) => {
  // console.log({
  //   title: to.meta.title,
  //   path: to.path,
  // })
  // 让tag处于当前激活状态
  activeTab.value = to.path
  // 添加标签导航的方法
  addTab({
    title: to.meta.title,
    path: to.path,
  })
})

// 添加标签导航的方法
function addTab(tab) {
  let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1
  if (noTab) {
    tabList.value.push(tab)
  }
  // 刷新后不会更新tab列表
  cookie.set('tabList', tabList.value)
}

// 点击标签项跳转到对应页面
const changeTab = (t) => {
  // 当前列表项激活状态
  activeTab.value = t
  // 跳转对应页面
  router.push(t)
}
// 下拉菜单操作
 const handleClose = (c) => {
        if (c == "clearAll") {
            // 切换回首页
            activeTab.value = "/"
            // 过滤只剩下首页
            tabList.value = [{
                title: '后台首页',
                path: "/"
            }]
        } else if (c == "clearOther") {
            // 过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path == activeTab.value)
        }
        cookie.set("tabList", tabList.value)
    }

</script>

<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
}
.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}
:deep(.el-tabs__header) {
  border: 0 !important;
  @apply mb-0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
