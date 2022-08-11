<template>
  <!-- <div>首页 <el-button text @click="handlelogout">退出登录</el-button></div> -->
  <el-container>
    <el-header><Header /></el-header>
    <el-container>
      <el-aside :width="$store.state.asideWidth"><Menu /></el-aside>
      <el-main>
        <Taglist /><router-view v-slot="{ Component }">
          <transition name="fade"
            ><keep-alive :max="10">
              <component :is="Component"></component></keep-alive
          ></transition> </router-view></el-main
    ></el-container>
  </el-container>
</template>

<script setup>
import Header from './modules/layoutHeader.vue'
import Menu from './modules/layoutMenu.vue'
import Taglist from './modules/layoutTagList.vue'
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-main {
  @apply bg-gray-100;
}
.el-aside {
  transition: all 0.2s;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}

body {
  @apply bg-gray-100;
}
</style>
