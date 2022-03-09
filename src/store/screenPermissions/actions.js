export const permissions = async ({commit}) => {
	commit('dashboardPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('patientsPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('staffPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('taskPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('auditTimePermissions', JSON.parse(localStorage.getItem("permission")))
	commit('roleAndPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('globalCodesPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('cptCodePermissions', JSON.parse(localStorage.getItem("permission")))
	commit('programsPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('providersPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('communicationPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('appointmentCalendarPermissions', JSON.parse(localStorage.getItem("permission")))
	commit('tasksDashboardPermissions', JSON.parse(localStorage.getItem("permission")))

}