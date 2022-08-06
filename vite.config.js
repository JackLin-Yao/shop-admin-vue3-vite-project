import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [WindiCSS(), vue()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': './src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
