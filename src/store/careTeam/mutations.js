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

export const deleteStaffSuccess = (state, data) => {
  state.deleteStaff = data
}
