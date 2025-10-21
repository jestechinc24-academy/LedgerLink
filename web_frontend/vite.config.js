import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    port: 3000,             // Custom port
    host: true,             // Expose to local network (0.0.0.0)
    open: true,             // Open browser on dev start
    https: false,           // Enable HTTPS (can be an object for custom certs)
    // proxy: {                // Proxy API requests to backend
    //   '/api': {
    //     target: 'http://localhost:8000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
})
