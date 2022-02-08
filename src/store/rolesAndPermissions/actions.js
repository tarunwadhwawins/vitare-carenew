import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const rolesList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['rolesList'], null, null).then((response) => {
		commit('rolesListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const rolePermissions = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['rolePermissions'], null, null).then((response) => {
		console.log('rolePermissionsSuccess', response.data);
		commit('rolePermissionsSuccess', response.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const addRole = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['role'], null, data).then((response) => {
		commit('addRoleSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const UpdateRole = async ({ commit }, {id, data}) => {
	await ServiceMethodService.common("put", API_ENDPOINTS['role'], id, data).then((response) => {
		commit('UpdateRoleSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const roleDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['roleDetails'], id, null).then((response) => {
		commit('roleDetailsSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const deleteRole = async ({ commit }, id) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['role'], id, null).then((response) => {
		commit('deleteRoleSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}