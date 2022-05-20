import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE as string),
  routes
})

export const makeRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes
  })

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} | ${import.meta.env.VITE_APP_TITLE}`
    : import.meta.env.VITE_APP_TITLE
  next()
})

export default router
