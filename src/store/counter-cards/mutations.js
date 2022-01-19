export const totalPatientsSuccess = (state, count) => {
    state.totalPatientcount = count
}
export const failure = (state, error) => {
    state.errorMsg = error;
}
export const newPatientsSuccess = (state, count) => {
    state.newPatientcount = count
}

export const abnormalPatientsSuccess = (state, count) => {
    state.abnormalPaitientcount = count
}

export const activePatientsSuccess = (state, count) => {
    state.activePaitientcount = count
}

export const inactivePatientsSuccess = (state, count) => {
    state.inActivePaitientcount = count
}

export const criticalPatientsSuccess = (state, count) => {
    state.criticalPaitientcount = count
}
