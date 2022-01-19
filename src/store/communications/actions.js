import ServiceMethodService from '../../services/serviceMethod';
// import AuthService from '../../services/auth';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const callPerStaff = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['CallPerStaff'], null, null).then((response) => {
		commit('callPerStaffSuccess', response.data.data);
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
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const communicationsList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['communicationsList'], null, null).then((response) => {
		commit('communicationsSuccess', response.data.data);
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