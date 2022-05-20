import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/main.scss'
import mitt from 'mitt'
import router from '@/router'
import store from '@/store'

const mountApp = async () => {
  const app = createApp(App)

  const emitter = mitt()

  app.use(router).use(store)

  app.provide('emitter', emitter)

  await router.isReady()
  app.mount('#app')
}

mountApp()
