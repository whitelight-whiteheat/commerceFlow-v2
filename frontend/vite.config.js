import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Make environment variables available globally
    __APP_ENV__: JSON.stringify(process.env.VITE_ENV || 'development'),
  },
  server: {
    // Development server configuration
    port: 5173,
    host: true,
  },
})
