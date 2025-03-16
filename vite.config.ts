import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: './dist', // 修改输出目录
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/api", // 后端 API 地址
        changeOrigin: true, // 确保更改源
        ws: true, // 支持 WebSocket 代理（虽然不是必须，但保持开启）
        rewrite: (path) => path.replace(/^\/api/, ""), // 如果你希望前端请求中不包含 `/api`
      },
    },
  },

})
