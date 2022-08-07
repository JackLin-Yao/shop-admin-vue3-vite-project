import { router } from '@/routers/index'
import ElementPlus from 'element-plus'
// import { createPinia } from 'pinia'
// import store from '@/store/index.js'
/**
 * 插件集合
 * @type {import }---这是Jsdoc语法
 * */
// const pinia = createPinia()
// console.log(store.state, '------------------------')
const plugins = [router, ElementPlus]
// console.log(plugins)
/**
 * 批量注册插件
 * @param {import("vue").App} app
 * @returns  app
 */

export const usePlugins = (app) => plugins.forEach(app.use, app)
// console.log(usePlugins)
