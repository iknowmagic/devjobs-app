import Component from '../sCheckbox.vue'

describe('sCheckbox', () => {
  it('Component exists', () => {
    // @ts-expect-error shallowWrap
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
