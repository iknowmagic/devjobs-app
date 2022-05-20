import Component from '../MainLayout.vue'

describe('MainLayout', () => {
  it('Component exists', () => {
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
