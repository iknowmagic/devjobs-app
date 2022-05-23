import Component from '../MultiSelect.vue'

describe('MultiSelect', () => {

  it('Component exists', () => {
    const wrapper = shallowWrap(Component)
    expect(wrapper.exists()).toBeTruthy()
  })
})
