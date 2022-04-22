import ServiceMethodService from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"
import { successSwal, errorSwal,errorLogWithDeviceInfo} from '@/commonMethods/commonMethod'
export const cptCodesList = async ({ commit },page) => {
	commit('loadingStatus', true)
	let link = page? API_ENDPOINTS['cptCodes']+"?active=1"+page: API_ENDPOINTS['cptCodes']+"?active=1"
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		commit('cptCode', response.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		commit('loadingStatus', false)
		commit('errorMsg', error.response.data)

	})
}

export const addCptCode = async ({ commit }, data) => {

	await ServiceMethodService.common("post", API_ENDPOINTS['cptCodes'], null, data).then((response) => {
		successSwal(response.data.message)
		commit('addCptCode', response.data.data);

	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		errorSwal(error.response.data.message)
		commit('errorMsg', error.response.data)
	})
}

export const deleteCptCode = async ({ commit }, id) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['cptCodes'], id, null).then((response) => {
		
		successSwal(response.data.message)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		commit('errorMsg', error.response.data)
	})
}

export const cptCodeDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['cptCodes'], id, null).then((response) => {
		commit('cptCodeDetails', response.data.data);
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		commit('errorMsg', error.response.data)
	})
}

export const updateCptCode = async ({ commit }, data) => {

	await ServiceMethodService.common("put", API_ENDPOINTS['cptCodes'], data.id, data.data).then((response) => {
		
		successSwal(response.data.message)
		commit('updateCptCode', response.data.data);

	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		commit('errorMsg', error.response.data)
	})
}
export const serviceList = async ({ commit } ) => {
	
	await ServiceMethodService.common("get", API_ENDPOINTS['service'], null, null).then((response) => {
		commit('service', response.data.data);
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		commit('errorMsg', error.response.data)
	})
}
