import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      // URL: "http://localhost:5000",
      URL: "https://bookmanager.onrender.com"

    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})