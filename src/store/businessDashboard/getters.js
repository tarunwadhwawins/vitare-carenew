 import { computed } from "vue"


  export const cptCodeValue = (state) => {
    return computed(() => {
      return state.cptCodeValue
    })
  }
  export const financialValue = (state) => {
    return computed(() => {
      return state.financialValue
    })
  }
  export const referalCount = (state) => {
    return computed(() => {
      return state.referalCount
    })
  }
  export const referalCountRecord = (state) => {
    return computed(() => {
      return state.referalCountRecord
    })
  }
