export const communicationsSuccess = async (state, communications) => {
  state.communicationsList = communications;
}
export const patientsListSuccess = async (state, patients) => {
  state.patientsList = patients;
}