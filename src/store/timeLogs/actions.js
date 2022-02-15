import ServiceMethodService from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"

export const addTimeLog = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['timeLog'], null, data).then((response) => {
		commit('addTimeLogSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const timeLogsList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['timeLog'], null, null).then((response) => {
		commit('timeLogsListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const deleteTimeLog = async ({ commit }, udid) => {
	await ServiceMethodService.common("delete", API_ENDPOINTS['timeLog'], udid, null).then((response) => {
		commit('deleteTimeLogSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const timeLogDetails = async ({ commit }, udid) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['timeLog'], udid, null).then((response) => {
		commit('timeLogDetailsSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const updateTimeLog = async ({ commit }, {udid, data}) => {
	console.log('updateTimeLog', data)
	await ServiceMethodService.common("put", API_ENDPOINTS['timeLog'], udid, data).then((response) => {
		commit('updateTimeLogSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const latestTimeLog = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['timeLog']+"?latest=latest&id="+id, null, null).then((response) => {
		commit('latestTimeLogSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}