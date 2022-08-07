<template>
  <div class="layout-header">
    <!-- logo图标 -->
    <span class="logo">
      <el-icon class="mr-2"><ElementPlus /></el-icon>后台管理系统</span
    >
    <!-- 折叠按钮区域 -->
    <el-icon class="icon-btn"> <Expand /></el-icon>
    <!-- 折叠按钮区域 -->
    <el-icon class="icon-btn"><Fold /> </el-icon>
    <!-- 刷新区域 -->
    <el-icon class="icon-btn"> <refresh /> </el-icon>

    <div class="ml-auto flex items-center">
      <!-- 全屏图标区域 -->
      <el-icon class="icon-btn"><FullScreen /></el-icon>
      <!-- 头像区域 -->
<el-dropdown class="dropdown">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.layout-header {
  @apply flex  items-center  bg-indigo-700 text-light-200 fixed top-0 left-0 right-0;
  height: 64px;
}
.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn {
  @apply flex items-center justify-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-indigo-500;
}
.dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex items-center justify-center text-light-300 mx-2;
}
</style>
