import ServiceMethodService from '../../services/serviceMethod';
// import AuthService from '../../services/auth';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const callPlanned = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['CallPlanned'], null, null).then((response) => {
		commit('callPlannedSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const addCommunication = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['addCommunication'], null, data).then((response) => {
		commit('addCommunicationSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const communicationTypes = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['communicationTypes'], null, null).then((response) => {
		commit('communicationTypesSuccess', response.data.data);
	})
	.catch((error) => {
		// if (error.response.status == 401) {
		// 	//AuthService.logout();
		// }
		// commit('failure', error.response.data);
		commit('failure', error);
	})
}

export const communicationsList = async ({ commit }, page) => {
	let link = page ?API_ENDPOINTS['communicationsList']+page : API_ENDPOINTS['communicationsList']
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		commit('communicationsSuccess', response.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const patientsList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['patientsList'], null, null).then((response) => {
		// console.log('patientsListSuccess', response.data.data);
		commit('patientsListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const futureAppointments = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['futureAppointments'], null, null).then((response) => {
		commit('futureAppointmentsSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const newRequests = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['newRequests'], null, null).then((response) => {
		commit('newRequestsSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const communicationsCount = async ({ commit }, date) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['communicationsCount']+'?date='+date, null).then((response) => {
		commit('communicationsCountSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const searchCommunications = async ({ commit }, params) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['communicationsList']+'?search='+params, null, null).then((response) => {
		commit('searchCommunicationsSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}