import Component from '../NotFound.vue'

describe('NotFound', () => {
  it('Component exists', () => {
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
