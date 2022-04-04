

export const screensPermissions = (state, auth) => {
	state.screensPermissions = auth?.actionId;
};