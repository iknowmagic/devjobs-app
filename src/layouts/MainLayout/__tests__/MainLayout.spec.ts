import Component from '../MainLayout.vue'

describe('MainLayout', () => {
  it('Component exists', () => {
    // @ts-expect-error shallowWrap
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
