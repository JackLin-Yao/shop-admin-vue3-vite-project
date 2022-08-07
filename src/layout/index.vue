<template>
  <!-- <div>首页 <el-button text @click="handlelogout">退出登录</el-button></div> -->
  <el-container>
    <el-header><Header /></el-header>
    <el-container>
      <el-aside><Menu /></el-aside>
      <el-main> <Taglist /><router-view></router-view></el-main
    ></el-container>
  </el-container>
</template>

<script setup>
import Header from './modules/layoutHeader.vue'
import Menu from './modules/layoutMenu.vue'
import Taglist from './modules/layoutTaglist.vue'
</script>

<style lang="scss" scoped></style>
