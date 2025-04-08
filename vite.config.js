import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  server: {
    proxy: {
      "/auth": "http://localhost:3001",
      "/companies": "http://localhost:3001",
      "/jobs": "http://localhost:3001",
      "/users": "http://localhost:3001",
    }
  },
  // 👇 This is the key setting that fixes the refresh issue on Render
  resolve: {
    alias: {
      // optional: helps with imports, not required for fixing refresh
    }
  },
  // 👇 This is what fixes the 404 refresh issue
  base: '/',
});
