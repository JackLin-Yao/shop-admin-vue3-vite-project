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
        <el-form
          ref="formRef"
          :rules="loginRules"
          :model="loginFrom"
          class="w-[250px]"
        >
          <!-- prop	model 的键名。 它可以是一个路径数组(例如 ['a', 'b', 0])。 在定义了 validate、resetFields 的方法时，该属性是必填的 -->
          <el-form-item prop="username">
            <el-input placeholder="请输入账号" v-model="loginFrom.username">
              <!-- 标签的插槽配置，就是带 name 的 slot 配置, 下面例子中，prefix就是插槽的名称。 -->
              <template #prefix>
                <el-icon><user /></el-icon>
              </template>
            </el-input>
          </el-form-item>
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
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
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
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
}

const formRef = ref(null)
const loading = ref(false) //// 登录的loding状态
const onSubmit = () => {
  // 触发表单验证 validate是异步
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log(valid)
      return false
    }
    // 开启loading
    loading.value = true
    console.log(loading.value)
    // 验证通过
  })
}

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
