import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const addInventory = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['inventory'], null, data).then((response) => {
		commit('addInventorySuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const inventoriesList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['inventory']+"?isAvailable=1&deviceType=100", null, null).then((response) => {
		commit('inventoriesListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const inventoryDetails = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['inventory'], id, null).then((response) => {
		commit('inventoryDetailsSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const updateInventory = async ({ commit }, {id, data}) => {
  console.log('id', id)
  console.log('data', data)
	await ServiceMethodService.common("put", API_ENDPOINTS['inventory'], id, data).then((response) => {
		commit('updateInventorySuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}