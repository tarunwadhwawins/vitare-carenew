export const rolesListSuccess = async (state, roles) => {
  state.rolesList = roles.data.map(role => {
    role.status = role.status == 1 ? true : false;
    return role
  })
}

export const rolePermissionsSuccess = async (state, roles) => {
  state.rolePermissions = roles;
}

export const addRoleSuccess = async (state, role) => {
  state.addRole = role
}

export const roleDetailsSuccess = async (state, role) => {
  state.roleDetails = role
}
export const editRoleSuccess = async (state, role) => {
  state.editRolesAndPermissions = role
}

export const deleteRoleSuccess = async (state, role) => {
  state.deleteRole = role
}

export const UpdateRoleSuccess = async (state, role) => {
  state.UpdateRole = role
}
export const dashboardWidget = async (state, widget) => {
  state.dashboardWidget = widget
}
export const editdWidget = async (state, widget) => {
  state.editWidget = widget
}

