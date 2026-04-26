import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173, // Frontend runs on 5173
    proxy: {
      // Proxy all /api requests to backend on port 5000
      '/api': {
        target: 'http://localhost:5000', // Backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Keep the /api prefix
      },
      // Proxy uploads to backend
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})