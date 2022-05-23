/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
    exclude: ['node_modules/**/*']
    // transformMode: {
    //   web: [/\.[jt]sx$/, /\.vue$/]
    // }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false
  }
})
