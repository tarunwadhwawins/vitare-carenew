import serviceMethod from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig";
import { errorLogWithDeviceInfo } from '@/commonMethods/commonMethod'

export const flagsList = async ({ commit }) => {
	commit('loadingStatus', true)
	await serviceMethod.common("get", API_ENDPOINTS['flag'], null, null).then((response) => {
		commit('flagsList', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const patientFlags = async ({ commit }) => {
	commit('loadingStatus', true)
	await serviceMethod.common("get", API_ENDPOINTS['flag']+`?type=patient`, null, null).then((response) => {
		commit('patientFlags', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const addPatientFlag = async ({ commit }, {patientUdid, data}) => {
  commit('loadingStatus', true)
	await serviceMethod.common("post", API_ENDPOINTS['patient']+'/'+patientUdid+'/'+API_ENDPOINTS['flag'], null, data).then(() => {
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const patientFlagsList = async ({ commit }, patientUdid) => {
	commit('loadingStatus', true)
	await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+patientUdid+'/'+API_ENDPOINTS['flag'], null, null).then((response) => {
		commit('patientFlagsList', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}