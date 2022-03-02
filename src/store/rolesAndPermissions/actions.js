 import ServiceMethodService from '../../services/serviceMethod';
 import { API_ENDPOINTS } from "../../config/apiConfig"
 import { successSwal, errorSwal } from '../../commonMethods/commonMethod'
export const rolesList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['rolesList'], null, null).then((response) => {
		//console.log(response.data.data)
		commit('rolesListSuccess', response.data.data);
	})
	.catch((error) => {
		errorSwal(error.response.data.message)
		commit('failure', error.response.data);
	})
}

export const rolePermissions = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['rolePermissions'], null, null).then((response) => {
		
		commit('rolePermissionsSuccess', response.data);
	})
	.catch((error) => {
		errorSwal(error.response.data.message)
		commit('failure', error.response.data);
	})
}

export const addRole = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['role'], null, data).then((response) => {
		commit('addRoleSuccess', response.data.data);
	})
	.catch((error) => {
		errorSwal(error.response.data.message)
		commit('failure', error.response.data);
	})
}
export const addPermissions = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['addPermissions'], data.id, data.data).then((response) => {
		successSwal(response.data.message)
		
	})
	.catch((error) => {
		errorSwal(error.response.data.message)
		commit('failure', error.response.data);
	})
}
export const editPermissions = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['rolePermissions'], id, null).then((response) => {
		commit('editRoleSuccess', response.data.data);
		
	})
	.catch((error) => {
		errorSwal(error.response.data.message)
		commit('failure', error.response.data);
	})
}

export const UpdateRole = async ({ commit }, {data}) => {
	await ServiceMethodService.common("put", API_ENDPOINTS['role'], data.id, data.data).then((response) => {
		commit('UpdateRoleSuccess', response.data.data);
	})
	.catch((error) => {
		errorSwal(error.response.data.message)
		commit('failure', error.response.data);
	})
}

export const roleDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['rolesList'], id, null).then((response) => {
		commit('roleDetailsSuccess', response.data.data);
	})
	.catch((error) => {
		
		commit('failure', error.response.data);
	})
}

export const deleteRole = async ({ commit }, id) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['role'], id, null).then((response) => {
		successSwal(response.data.message)
	})
	.catch((error) => {
		
		commit('failure', error.response.data);
	})
}