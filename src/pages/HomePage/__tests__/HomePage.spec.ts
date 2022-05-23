import Component from '../HomePage.vue'

describe('HomePage', () => {
  it('Component exists', () => {
    // @ts-expect-error shallowWrap
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
