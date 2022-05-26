import Component from '../sButton.vue'

describe('sButton', () => {
  it('Component exists', () => {
    // @ts-expect-error shallowWrap
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
