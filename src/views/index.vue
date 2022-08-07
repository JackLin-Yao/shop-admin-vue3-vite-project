<template>
  <div>
    {{ $store.state.user }}
    <div>首页 <el-button text @click="handlelogout">退出登录</el-button></div>
  </div>
</template>

<script setup>
import { logout } from '@/api/manager'
import { showModal, toast } from '@/composables/utils'
// import { toast } from '../composables/utils';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
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
</script>

<style lang="scss" scoped></style>
