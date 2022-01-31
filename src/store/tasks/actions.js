import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const tasksList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['tasksList'], null, null).then((response) => {
		// console.log('tasksListSuccess', response.data.data);
		commit('tasksListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const addTask = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['addTask'], null, data).then((response) => {
		// console.log('addTaskSuccess', response.data.data);
		commit('addTaskSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const taskStatus = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['taskStatus'], null, null).then((response) => {
		// console.log('taskStatusSuccess', response.data.data);
		commit('taskStatusSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const taskPriority = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['taskPriority'], null, null).then((response) => {
		// console.log('taskPrioritySuccess', response.data.data);
		commit('taskPrioritySuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const searchTasks = async ({ commit }, params) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['searchTasks']+'?search='+params, null, null).then((response) => {
		commit('searchTasksSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}
