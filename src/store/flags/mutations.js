
export const flagsList = (state, flags) => {
  state.flagsList = flags
}

export const patientFlagsList = (state, flags) => {
  console.log('flags', flags[0])
  state.patientFlagsList = flags
  state.latestFlag = flags[0]
}