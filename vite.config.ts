import 'dotenv/config'

import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import handlebars from 'vite-plugin-handlebars'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false
  },
  base: `${process.env.VITE_APP_BASE}/`.replace('//', '/'),
  plugins: [
    eslintPlugin(),
    handlebars({
      context: {
        title: process.env.VITE_APP_TITLE,
        base: process.env.VITE_APP_BASE
      }
    }) as unknown as PluginOption,
    vue()
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  }
})
