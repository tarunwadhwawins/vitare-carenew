
export const newappointmentSuccess = (state, appointment) => {
    state.newappointment = appointment;
}
export const futureappointmentSuccess = (state, appointment) => {
    state.futureappointment = appointment;
}

export const todayappointmentSuccess = (state, appointment) => {
    state.todayappointment = appointment;
}

export const appointmentcountSuccess = (state, count) => {
    state.appointmentcount = count;
}

export const wellnessSuccess = (state, count) => {
    state.wellness = count;
}
export const specializationSuccess = (state, count) => {
    state.specialization = count;
}

export const networkinSuccess = (state, count) => {
    state.networkin = count;
}
export const networkoutSuccess = (state, count) => {
    state.networkout = count;
}