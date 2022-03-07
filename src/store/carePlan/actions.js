import serviceMethod from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const addCarePlan = async ({ commit }, data) => {
	console.log('{patientId, data}', data)
	commit('loadingStatus', true)
	await serviceMethod.common("post", API_ENDPOINTS['patient']+'/'+data.patientId+'/goal', null, data.data).then(() => {
		commit('loadingStatus', false)
	})
	.catch((error) => {
		commit('failure', error);
		commit('loadingStatus', false)
	})
}

export const carePlansList = async ({ commit }, patientId) => {
	commit('loadingStatus', true)
	await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+patientId+'/goal', null, null).then((response) => {
		commit('carePlansList', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		commit('failure', error);
		commit('loadingStatus', false)
	})
}

export const deleteCarePlan = async ({ commit }, {patientId, carePlanId}) => {
	commit('loadingStatus', true)
	await serviceMethod.common("delete", API_ENDPOINTS['patient']+'/'+patientId+'/goal', carePlanId, null).then(() => {
		commit('loadingStatus', false)
	})
	.catch((error) => {
		commit('failure', error);
		commit('loadingStatus', false)
	})
}