import { computed } from "vue"

export const referralList = (state) => {
  return computed(() => {
    return state.referralList
  })
}
export const referralColumns = (state) => {
  return computed(() => {
    return state.referralColumns
  })
}
export const referrareferralMetalList = (state) => {
  return computed(() => {
    return state.referralMeta
  })
}