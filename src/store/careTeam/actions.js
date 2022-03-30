import serviceMethod from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig";
import { errorLogWithDeviceInfo } from '@/commonMethods/commonMethod';

export const addCareTeam = async ({ commit }, {patientUdid, data}) => {
  commit('loadingStatus', true)
	await serviceMethod.common("post", API_ENDPOINTS['patient']+'/'+patientUdid+'/staff', null, data).then((response) => {
		commit('addCareTeamSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const careTeamList = async ({ commit }, patientUdid) => {
	commit('loadingStatus', true)
	await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+patientUdid+'/staff', null, null).then((response) => {
		commit('careTeamListSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const deleteStaff = async ({ commit }, {patientUdid, patientStaffUdid}) => {
	commit('loadingStatus', true)
	await serviceMethod.common("delete", API_ENDPOINTS['patient']+'/'+patientUdid+'/staff/'+patientStaffUdid, null, null).then((response) => {
		commit('deleteStaffSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}