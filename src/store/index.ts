import { createPinia } from 'pinia'

import loadingProgressPinia from './plugins/loadingProgressPinia'

const pinia = createPinia()
pinia.use(loadingProgressPinia)

export default pinia
export { loadingProgress } from './modules/loadingProgress'
