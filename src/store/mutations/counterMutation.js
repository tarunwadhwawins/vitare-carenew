export const totalPatientsSuccess = (state, count) => {
    state.tcount = count;
}
export const failure = (state, error) => {
    state.errorMsg = error;
}
export const newPatientsSuccess = (state, count) => {
    state.ncount = count;
}

export const abnormalPatientsSuccess = (state, count) => {
    state.abcount = count;
}

export const activePatientsSuccess = (state, count) => {
    state.activecount = count;
}

export const inactivePatientsSuccess = (state, count) => {
    state.inactivecount = count;
}

export const criticalPatientsSuccess = (state, count) => {
    state.critcount = count;
}
