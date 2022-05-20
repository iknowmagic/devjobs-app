import Component from '../HomePage.vue'

describe('HomePage', () => {
  it('Component exists', () => {
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
