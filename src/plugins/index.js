import { router } from '@/routers/index'
import ElementPlus from 'element-plus'

/**
 * 插件集合
 * @type {import  ("vue").Plugin[]}---这是Jsdoc语法
 * */
const plugins = [router, ElementPlus]
/**
 * 批量注册插件
 * @param {import("vue").App} app
 * @returns  app
 */

export const usePlugins = (app) => plugins.forEach(app.use, app)
