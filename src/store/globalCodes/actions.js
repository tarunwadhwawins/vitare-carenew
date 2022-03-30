import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
import { successSwal, errorSwal,errorLogWithDeviceInfo } from '@/commonMethods/commonMethod';

export const globalCodesList = async ({ commit },page) => {
	commit('loadingStatus', true)
	let link = page? API_ENDPOINTS['globalCodesList']+"?active=1"+page : API_ENDPOINTS['globalCodesList']+"?active=1"
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		//console.log(response.data.data)
		commit('globalCodeCategory', response.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('loadingStatus', false)
		commit('failure', error.response.data);
	})
}

export const searchGlobalCodes = async ({ commit }, params) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['globalCodesList']+'?search='+params, null, null).then((response) => {
		commit('searchGlobalCodesSuccess', response.data.data);
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		errorSwal(error.response.data.message)
	})
}

export const addGlobalCode = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['globalCode'], null, data).then((response) => {
		commit('addGlobalCodeSuccess', response.data.data);
		successSwal(response.data.message)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		errorSwal(error.response.data.message)
	})
}

export const deleteGlobalCode = async ({ commit }, id) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['globalCode'], id, null).then((response) => {
		commit('deleteGlobalCodeSuccess', response.data.data);
		successSwal(response.data.message)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		errorSwal(error.response.data.message)
	})
}

export const globalCodeDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['globalCode'], id, null).then((response) => {
		commit('globalCodeDetailsSuccess', response.data.data);
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const updateGlobalCode = async ({ commit }, {id, data}) => {
	await ServiceMethodService.common("patch", API_ENDPOINTS['globalCode'], id, data).then((response) => {
		commit('updateGlobalCodeSuccess', response.data.data);
		successSwal(response.data.message)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		errorSwal(error.response.data.message)
	})
}
