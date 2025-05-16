import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  // Disable HMR when using Vercel dev
  server: {
    // eslint-disable-next-line no-undef
    hmr: process.env.VERCEL ? false : true,
  },
  assetsInclude: ['**/*.html'],
})
