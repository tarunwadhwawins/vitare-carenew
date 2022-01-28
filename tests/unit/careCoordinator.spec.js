import { shallowMount } from '@vue/test-utils'
import CareCoordinate from '@/components/care-coordinator/CareCoordinator.vue'

const factory = (values = {}) => {
  return shallowMount(CareCoordinate, {
    data () {
      return {
        ...values
      }
    }
  })
}


describe('CareCoordinate', () => {
  it('does not render an error', () => {
    const wrapper = factory()
    // expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})
