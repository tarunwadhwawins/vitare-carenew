import { shallowMount } from '@vue/test-utils'
import Login from '@/components/login/Login.vue'

describe('Login.vue', () => {
  it('renders message when component is created', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Login, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
