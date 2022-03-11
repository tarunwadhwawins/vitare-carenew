import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
import { successSwal, errorSwal} from '../../commonMethods/commonMethod'
export const cptCodesList = async ({ commit },page) => {
	let link = page? API_ENDPOINTS['cptCodes']+"?active=1"+page: API_ENDPOINTS['cptCodes']+"?active=1"
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		commit('cptCodesList', response.data);
	})
	.catch((error) => {
		commit('failure', error.response.data);
	})
}

export const addCptCode = async ({ commit }, data) => {

	await ServiceMethodService.common("post", API_ENDPOINTS['cptCodes'], null, data).then((response) => {
		successSwal(response.data.message)
		commit('addCptCode', response.data.data);

	})
	.catch((error) => {
		errorSwal(error.response.data.message)
		commit('failure', error.response.data);
	})
}

export const deleteCptCode = async ({ commit }, id) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['cptCodes'], id, null).then((response) => {
		
		successSwal(response.data.message)
	})
	.catch((error) => {
	
		commit('failure', error.response.data);
	})
}

export const cptCodeDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['cptCodes'], id, null).then((response) => {
		commit('cptCodeDetails', response.data.data);
	})
	.catch((error) => {
	
		commit('failure', error.response.data);
	})
}

export const updateCptCode = async ({ commit }, data) => {

	await ServiceMethodService.common("put", API_ENDPOINTS['cptCodes'], data.id, data.data).then((response) => {
		
		successSwal(response.data.message)
		commit('updateCptCode', response.data.data);

	})
	.catch((error) => {
	
		commit('failure', error.response.data);
	})
}
export const serviceList = async ({ commit } ) => {
	
	await ServiceMethodService.common("get", API_ENDPOINTS['service'], null, null).then((response) => {
		commit('service', response.data.data);
	})
	.catch((error) => {
		commit('failure', error.response.data);
	})
}
