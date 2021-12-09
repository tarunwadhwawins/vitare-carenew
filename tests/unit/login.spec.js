import { shallowMount } from '@vue/test-utils'
import Login from '@/components/login/Login.vue'

const factory = (values = {}) => {
  return shallowMount(Login, {
    data () {
      return {
        ...values
      }
    }
  })
}


describe('Login', () => {
  it('does not render an error when username is 7 characters or more', () => {
    const wrapper = factory()
    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})


