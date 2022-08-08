<template>
  <div>
    <el-row class="login-container">
      <el-col :lg="16" :md="12" class="left"
        ><div>
          <div>欢迎光临</div>
          <div>Vue3 + ElementPlus 商城管理后台系统</div>
        </div></el-col
      >
      <el-col :lg="8" :md="12" class="right"
        ><h2 class="title">欢迎回来</h2>
        <div>
          <span class="line"></span>
          <span>账号密码登录</span>
          <span class="line"></span>
        </div>
        <!-- rules	表单验证规则 model	表单数据对象 -->
        <!-- ref 属性涉及Dom 元素的获取(el-form表单对象)。我们首先需要了解下javasrcipt 是如何获取Dom 元素是通过：document.querySelector（".input"）获取dom元素节点 。Vue 为简化DOM获取方法提出了ref 属性和$refs 对象。一般的操作流程是:ref 绑定控件，$refs 获取控件。 -->

        <el-form
          ref="formRef"
          :rules="loginRules"
          :model="loginFrom"
          class="w-[250px]"
        >
          <!-- Account form item-->
          <!-- prop	model 的键名。 它可以是一个路径数组(例如 ['a', 'b', 0])。 在定义了 validate、resetFields 的方法时，该属性是必填的 -->
          <el-form-item prop="username">
            <el-input placeholder="请输入账号" v-model="loginFrom.username">
              <!-- 标签的插槽配置，就是带 name 的 slot 配置, 下面例子中，prefix就是插槽的名称。 -->
              <template #prefix>
                <el-icon><user /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- Password table item -->
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginFrom.password"
              placeholder="请输入密码"
              show-password
              ><template #prefix>
                <el-icon><lock /></el-icon> </template
            ></el-input>
          </el-form-item>
          <!-- Submit button item-->
          <el-form-item>
            <!-- loading	是否为加载中状态 -->
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
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// import { log } from 'console'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { login } from '@/api/manager'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '@/composables/utils'
import { getinfo } from '@/api/manager'
import { setToken } from '@/composables/auth'

const store = useStore()

const router = useRouter()
// import { loginStore } from '../store/login.js'
const loginFrom = reactive({
  username: '',
  password: '',
})

const loginRules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
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
}

const formRef = ref(null)
const loading = ref(false) //// 登录的loding状态
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    login(loginFrom.username, loginFrom.password)
      .then((res) => {
        // console.log(res.token)
        toast('登陆成功')
        setToken(res.token)
        // console.log('res.token:----', res.token)
        // getinfo().then((res2) => {
        //   // console.log('getinfo请求失败')
        //   console.log(store)
        //   store.commit('SET_USERINFO', res2)
        //   // console.log('res2的值', res2)
        //   // console.log('NotFound------404')
        // })
        router.push('/')
      })
      .finally(() => {
        loading.value = false
      })
  })
}
// const onSubmit = () => {
//   formRef.value.validate((valid) => {
//     if (!valid) {
//       return false
//     }
//     loading.value = true
//     let abb = login(loginFrom.username, loginFrom.password).then((res) => {
//       console.log(res)
//       toast('登陆成功')

//     })
//   })
// }

// 监听回车事件
function onKeyUp(e) {
  if (e.key == 'Enter') onSubmit()
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply bg-light-50 flex-col;
}
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}
.right .title {
  @apply font-bold text-3xl text-gray-800;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
