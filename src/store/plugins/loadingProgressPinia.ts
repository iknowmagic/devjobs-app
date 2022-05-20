import { watch } from 'vue'

import { PiniaPluginContext } from 'pinia'

import NProgress from 'nprogress'

NProgress.configure({
  easing: 'ease',
  speed: 500,
  template: `<div class="bar" role="bar" style="background: transparent">
    </div>
    <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
    </div>
    `
})

const loadingProgressPinia = ({ store }: PiniaPluginContext) => {
  if (store.$id === 'loadingProgress') {
    watch(
      store.$state,
      (newValue, oldValue) => {
        if (newValue.loading === 0) return NProgress.done()
        if (oldValue.loading === 0) return NProgress.start()
        NProgress.set(1.8 / Math.max(oldValue.loading, newValue.loading))
      },
      { deep: true }
    )
  }
}

export default loadingProgressPinia
