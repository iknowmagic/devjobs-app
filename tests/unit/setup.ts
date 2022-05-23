// import store from '@/store'

import { mount, shallowMount } from '@vue/test-utils'
import mitt from 'mitt'
import { createRouterMock } from 'vue-router-mock'

const emitter = mitt()

global.wrap = (Component = {}, options = {}) => {
  // @ts-expect-error component
  return mount(Component, {
    global: {
      plugins: [/* store, */ { router: createRouterMock }],
      components: {},
      provide: {
        emitter
      }
    },
    ...options
  })
}

global.shallowWrap = (Component = {}, options = {}) => {
  // @ts-expect-error component
  return shallowMount(Component, {
    global: {
      plugins: [/* store, */ { router: createRouterMock }],
      components: {},
      provide: {
        emitter
      }
    },
    ...options
  })
}
