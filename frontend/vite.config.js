/*
 * @Author: Liangwei Wang liangweioio27@gmail.com
 * @Date: 2024-07-06 15:58:36
 * @LastEditTime: 2024-07-11 16:15:28
 * @LastEditors: Liangwei Wang
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://polar-datahub.sysu.edu.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
