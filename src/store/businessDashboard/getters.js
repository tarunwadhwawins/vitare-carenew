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
