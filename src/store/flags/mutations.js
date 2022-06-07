

export const flagsList = (state, flags) => {
  state.flagsList = flags;
}

export const patientFlagsList = (state, flags) => {
  state.latestFlag = flags[0]
  state.patientFlagsList = flags
}

export const flagsForPatients = (state, flags) => {
  state.flagsForPatients = flags
}