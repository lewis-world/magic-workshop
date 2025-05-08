import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock', // mock文件存放目录
      localEnabled: process.env.NODE_ENV === 'development', // 开发环境启用
    }),
  ],
})
