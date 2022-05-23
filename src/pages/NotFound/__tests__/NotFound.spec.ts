import Component from '../NotFound.vue'

describe('NotFound', () => {
  it('Component exists', () => {
    // @ts-expect-error shallowWrap
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
