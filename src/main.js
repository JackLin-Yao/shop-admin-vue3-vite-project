import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import { usePlugins } from '@/plugins/index'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/store/index'
import '@/utils/permission'
import NProgress from 'nprogress' // 引入
import 'nprogress/nprogress.css' // 样式

const app = createApp(App)
usePlugins(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.mount('#app')
