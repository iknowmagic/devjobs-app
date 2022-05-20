// https://medium.com/@LoCascioNick/create-a-global-loading-progress-indicator-using-vuex-axios-and-nprogress-20451b33145a
import { acceptHMRUpdate, defineStore } from 'pinia'

export const loadingProgress = defineStore('loadingProgress', {
  state: () => ({
    loading: 0
  }),
  actions: {
    startLoading() {
      this.loading++
    },
    finishLoading() {
      this.loading--
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(loadingProgress, import.meta.hot))
}
