import { computed } from "vue"

export const clicalTask = (state) => {
  return computed(() => {
    return state.clicalTask
  })
}
export const patientsFlag = (state) => {
  return computed(() => {
    return state.patientsFlag
  })
}
export const appointmentCount = (state) => {
  return computed(() => {
    return state.appointmentCount
  })
}
export const escalationCount = (state) => {
  return computed(() => {
    return state.escalationCount
  })
}
export const escalationRecord = (state) => {
  return computed(() => {
    return state.escalationRecord
  })
}