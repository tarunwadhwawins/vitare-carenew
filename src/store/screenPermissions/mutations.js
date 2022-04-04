// export const dashboardPermissions = (state, permission) => {
// 	state.dashboardPermissions = permission ? permission.widgetId : '';
// };
// export const roleAndPermissions = (state, auth) => {
// 	state.roleAndPermissions = auth.actionId;
// };

// export const globalCodesPermissions = (state, auth) => {
// 	state.globalCodesPermissions = auth.actionId;
// };

// export const cptCodePermissions = (state, auth) => {
// 	state.cptCodePermissions = auth.actionId;
// };

// export const programsPermissions = (state, auth) => {
// 	state.programsPermissions = auth.actionId;
// };

// export const providersPermissions = (state, auth) => {
// 	state.providersPermissions = auth.actionId;
// };

// export const staffPermissions = (state, auth) => {
// 	state.staffPermissions = auth.actionId;
// };

// export const patientsPermissions = (state, auth) => {
// 	state.patientsPermissions = auth.actionId;
// };

// export const communicationPermissions = (state, auth) => {
// 	state.communicationPermissions = auth.actionId;
// };

// export const appointmentCalendarPermissions = (state, auth) => {
// 	state.appointmentCalendarPermissions = auth.actionId;
// };

// export const tasksDashboardPermissions = (state, auth) => {
// 	state.tasksDashboardPermissions = auth.actionId;
// };


export const screensPermissions = (state, auth) => {
	state.screensPermissions = auth?.actionId;
};