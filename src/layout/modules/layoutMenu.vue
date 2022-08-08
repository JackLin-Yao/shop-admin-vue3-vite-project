<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      :default-active="defaultActive"
      class="border-0"
      @select="handleSelect"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <!-- 一级菜单-1 -->
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon"></component></el-icon>
            <span>{{ item2.name }}</span></el-menu-item
          >
        </el-sub-menu>
        <!-- 一级菜单-2 -->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
        <!-- 一级菜单-3
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        一级菜单-4 -->
        <!-- <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> -->
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const asideMenus = computed(() => store.state.menus)
// const asideMenus = [{
//     "name": "后台面板",
//     "icon": "help",
//     "child": [{
//         "name": "主控台",
//         "icon": "home-filled",
//         "frontpath": "/",
//     }]
// }, {
//     "name": "商城管理",
//     "icon": "shopping-bag",
//     "child": [{
//         "name": "商品管理",
//         "icon": "shopping-cart-full",
//         "frontpath": "/goods/list",
//     }]
// }]

// 点击跳转对应模块信息
const router = useRouter()
const handleSelect = (e) => {
  router.push(e)
}

// 是否折叠
const store = useStore()
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))

// 默认选中
const route = useRoute()
const defaultActive = ref(route.path)
</script>

<style scoped>
.f-menu {
  transition：all 0.2s;
  /* weight: 15.625rem; */
  top: 4rem;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x:hidden;
  @apply shadow-md fixed;
}
.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>
