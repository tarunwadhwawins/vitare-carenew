export const permissions = async ({commit}) => {
	commit('dashboardPermissions', localStorage.getItem('roleAuth'))
	commit('patientsPermissions', localStorage.getItem('roleAuth'))
	commit('staffPermissions', localStorage.getItem('roleAuth'))
	commit('taskPermissions', localStorage.getItem('roleAuth'))
	commit('auditTimePermissions', localStorage.getItem('roleAuth'))
	commit('roleAndPermissions', localStorage.getItem('roleAuth'))
	commit('globalCodesPermissions', localStorage.getItem('roleAuth'))
	commit('cptCodePermissions', localStorage.getItem('roleAuth'))
	commit('programsPermissions', localStorage.getItem('roleAuth'))
	commit('providersPermissions', localStorage.getItem('roleAuth'))
	commit('communicationPermissions', localStorage.getItem('roleAuth'))
	commit('appointmentCalendarPermissions', localStorage.getItem('roleAuth'))
	commit('tasksDashboardPermissions', localStorage.getItem('roleAuth'))

}