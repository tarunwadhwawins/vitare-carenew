import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const cptCodesList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['cptCodes'], null, null).then((response) => {
		commit('cptCodesList', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const addCptCode = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['cptCodes'], null, data).then((response) => {
		commit('addCptCode', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const deleteCptCode = async ({ commit }, id) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['cptCodes'], id, null).then((response) => {
		commit('deleteCptCode', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const cptCodeDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['cptCodes'], id, null).then((response) => {
		commit('cptCodeDetails', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const updateCptCode = async ({ commit }, {id, data}) => {
	console.log('Edit Record Id', id)
	console.log('Edit Record data', data)
	await ServiceMethodService.common("patch", API_ENDPOINTS['cptCodes'], id, data).then((response) => {
		commit('updateCptCode', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}
