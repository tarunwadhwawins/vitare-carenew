

export const flagsList = (state, flags) => {
  state.flagsList = flags;
}

export const patientFlagsList = (state, flags) => {
  state.latestFlag = flags[0]
  state.patientFlagsList = flags
}

export const patientFlags = (state, flags) => {
  state.patientFlags = flags
}