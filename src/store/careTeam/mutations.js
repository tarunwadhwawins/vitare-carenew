export const patientCareCoordinatorsList = (state, data) => {
  state.patientCareCoordinatorsList = data.map(item => {
    item.isPrimary = item.isPrimary ? 'Yes' : 'No'
    item.type = item.type ? 'Care Coordinator' : 'Health Team'
    return item
  })
  state.latestCareTeam = data[0]
}

export const careTeamList = (state, data) => {
  state.careTeamList = data.map(item => {
    item.isPrimary = item.isPrimary ? 'Yes' : 'No'
    item.type = item.type ? 'Care Coordinator' : 'Health Team'
    return item
  })
  state.latestCareTeam = data[0]
}

export const physiciansList = (state, data) => {
  state.physiciansList = data.map(item => {
    item.isPrimary = item.isPrimary ? 'Yes' : 'No'
    item.type = item.type ? 'Care Coordinator' : 'Health Team'
    return item
  })
  state.latestPhysician = data[0]
}

export const deletePatientCareCoordinator = (state, data) => {
  state.deletePatientCareCoordinator = data
}

export const patientCareCoordinatorDetails = (state, data) => {
  // console.log('staff data', data.staff)
  data.isPrimary = data.isPrimary == 1 ? true : false
  state.patientCareCoordinatorDetails = data
}

export const updatePatientCareCoordinator = (state, data) => {
  state.updatePatientCareCoordinator = data
}

