
export const addCareTeamSuccess = (state, data) => {
  state.addCareTeam = data
}

export const careTeamListSuccess = (state, data) => {
  state.careTeamList = data
  state.latestCareTeam = data[0]
}

export const deleteStaffSuccess = (state, data) => {
  state.deleteStaff = data
}
