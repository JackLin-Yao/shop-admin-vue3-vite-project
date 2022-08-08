<template>
  <div class="layout-header">
    <!-- logo图标 -->
    <span class="logo">
      <el-icon class="mr-2"><ElementPlus /></el-icon>后台管理系统</span
    >
    <!-- 折叠按钮区域 -->
    <!-- <el-icon class="icon-btn"> </el-icon> -->
    <!-- 折叠按钮区域 -->
    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')"
      ><Fold v-if="$store.state.asideWidth == '250px'" /> <Expand v-else
    /></el-icon>
    <!-- 刷新区域 -->
    <el-tooltip
      class="box-item"
      effect="dark"
      content="刷新"
      placement="bottom-end"
    >
      <el-icon class="icon-btn" @click="handleRefresh"> <refresh /> </el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <!-- 全屏图标区域 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom-end"
      >
        <el-icon class="icon-btn" @click="toggle"
          ><FullScreen v-if="!isFullscreen" /> <Aim v-else
        /></el-icon>
      </el-tooltip>
      <!-- 头像区域 -->
      <el-dropdown class="dropdown" @command="handleCommand">
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
  <!-- 抽屉部分内容 -->
  <!-- <el-drawer
    v-model="showDrawer"
    title="修改密码"
    size="50%"
    close-on-click-moda="false"
  >
    <el-form
      ref="formRef"
      :rules="loginRules"
      :model="loginFrom"
      label-width="80px"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input
          v-model="loginFrom.oldpassword"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          type="password"
          v-model="loginFrom.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          type="password"
          v-model="loginFrom.repassword"
          placeholder="请输入确认密码"
          show-password
        ></el-input>
        <el-button
          color="#626aef"
          class="w-[250px]"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer> -->

  <!-- 抽屉封装组件 -->
  <FromDrawer
    ref="fromDrawerRef"
    title="修改密码"
    destroyOnClose
    @submit="onSubmit"
  >
    <el-form
      ref="formRef"
      :rules="loginRules"
      :model="loginFrom"
      label-width="80px"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input
          v-model="loginFrom.oldpassword"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          type="password"
          v-model="loginFrom.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          type="password"
          v-model="loginFrom.repassword"
          placeholder="请输入确认密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </FromDrawer>
</template>

<script setup>
import { logout, updatepassword } from '@/api/manager'
import { showModal, toast } from '@/composables/utils'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'
import FromDrawer from '@/components/FromDrawer.vue'

// const showDrawer = ref(false)

// 全屏操作
const {
  // 是否全屏状态
  isFullscreen,
  // 切换全屏
  toggle,
} = useFullscreen()

const { fromDrawerRef, loginFrom, loginRules, onSubmit, openRepasswordForm } =
  useRepassword()
const router = useRouter()
const store = useStore()

// 代码简化为了后期维护方便
function useRepassword() {
  // 密码修改信息
  const loginFrom = reactive({
    repassword: '',
    oldpassword: '',
    password: '',
  })
  // 登录验证规则数据
  const loginRules = {
    repassword: [
      {
        required: true,
        message: '确认密码不能为空',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
    ],
    oldpassword: [
      {
        required: true,
        message: '旧密码不能为空',
        trigger: 'blur',
      },
    ],
  }
  // 提交操作

  const fromDrawerRef = ref(null)
  const formRef = ref(null)
  // const loading = ref(false) //// 登录的loding状态
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false
      }
      // 打开loding状态
      // loading.value = true
      fromDrawerRef.value.showLoading()
      // 提交修改密码信息
      updatepassword(loginFrom)
        .then((res) => {
          toast('修改密码成功，请重新登录')
          // 除用户的用户状态  vuex
          store.dispatch('logout')
          // 跳转登录页
          router.push('/login')
        })
        .finally(() => {
          // loading.value = false
          fromDrawerRef.value.hideLoading()
        })
    })
  }

  const openRepasswordForm = () => fromDrawerRef.value.open()
  return { fromDrawerRef, loginFrom, loginRules, onSubmit, openRepasswordForm }
}
// 头像点击操作
const handleCommand = (e) => {
  // console.log(e)
  switch (e) {
    case 'logout':
      handlelogout()
      break
    case 'rePassword':
      // console.log('修改密码')
      // showDrawer.value = true
      openRepasswordForm()
      break
  }
}

// 退出登录
function handlelogout() {
  showModal('是否要退出登录').then((res) => {
    logout().finally(() => {
      // 清除cookie里面的Token

      // 清除用户的用户状态  vuex
      store.dispatch('logout')
      // 跳转登录页
      router.push('/login')
      // 提示退出成功
      toast('退出登录成功')
    })
  })
}

// 刷新
const handleRefresh = () => location.reload()
</script>

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
