import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  server: {
    historyApiFallback: true, // ✅ fallback to index.html on unknown routes
    proxy: {
      "/auth": "http://localhost:3001",
      "/companies": "http://localhost:3001",
      "/jobs": "http://localhost:3001",
      "/users": "http://localhost:3001",
    }
  }
});
