export const permissions = async ({commit}) => {
	commit('screensPermissions', JSON.parse(localStorage.getItem("permission")))
}