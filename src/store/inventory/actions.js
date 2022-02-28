import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const addInventory = async ({ commit }, data) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("post", API_ENDPOINTS['inventory'], null, data).then((response) => {
		commit('addInventorySuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const inventoriesList = async ({ commit }) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['inventory'], null, null).then((response) => {
		commit('inventoriesListSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const inventoryDetails = async ({ commit }, id) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['inventory'], id, null).then((response) => {
		commit('inventoryDetailsSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const updateInventory = async ({ commit }, {id, data}) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("put", API_ENDPOINTS['inventory'], id, data).then((response) => {
		commit('updateInventorySuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const deleteInventory = async ({ commit }, id) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("delete", API_ENDPOINTS['inventory'], id, null).then((response) => {
		commit('deleteInventorySuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const deviceModalsList = async ({ commit }, id) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['model']+'?deviceType='+id, null, null).then((response) => {
		commit('deviceModalsListSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}