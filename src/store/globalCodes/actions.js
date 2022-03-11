import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const globalCodesList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['globalCodesList']+"?active=1", null, null).then((response) => {
		commit('globalCodesListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const searchGlobalCodes = async ({ commit }, params) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['globalCodesList']+'?search='+params, null, null).then((response) => {
		commit('searchGlobalCodesSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const addGlobalCode = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['globalCode'], null, data).then((response) => {
		commit('addGlobalCodeSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const deleteGlobalCode = async ({ commit }, id) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['globalCode'], id, null).then((response) => {
		commit('deleteGlobalCodeSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const globalCodeDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['globalCode'], id, null).then((response) => {
		commit('globalCodeDetailsSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const updateGlobalCode = async ({ commit }, {id, data}) => {
	console.log('Edit Record Id', id)
	console.log('Edit Record data', data)
	await ServiceMethodService.common("patch", API_ENDPOINTS['globalCode'], id, data).then((response) => {
		commit('updateGlobalCodeSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}
