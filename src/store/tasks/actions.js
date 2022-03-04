import ServiceMethodService from '@/services/serviceMethod';
import { successSwal, errorSwal } from '@/commonMethods/commonMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"

export const tasksList  = async ({commit}, page) => {
	let link = page ? API_ENDPOINTS['tasksList']+page : API_ENDPOINTS['tasksList']
	//commit('loadingStatus', true)
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		// console.log('tasksListSuccess', response.data.data)
		commit('tasksListSuccess', response.data);
		//commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const addTask = async ({ commit }, data) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['addTask'], null, data).then((response) => {
		// console.log('addTaskSuccess', response.data.data);
		successSwal(response.data.message)
		commit('addTask', response.data.data);
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}



export const editTask = async ({ commit }, id) => {
	commit('loadingStatus', true)
	
	await ServiceMethodService.common("get", `task/`+id.id, null, null).then((response) => {
		commit('editTask', response.data.data);
		commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const tasksDelete = async ({ commit }, id) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("delete", `task/${id}`, null, null).then((response) => {
		successSwal(response.data.message)
		commit('tasksDelete', response.data.data);
		commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const updateTask = async ({ commit }, data) => {
	commit('loadingStatus', true)
	
	await ServiceMethodService.common("put", `task/${data.id.id}`, null, data.data).then((response) => {
		commit('updateTask', response.data.data);
		successSwal(response.data.message)
		commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const taskStatus = async ({ commit }) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['taskStatus'], null, null).then((response) => {
		// console.log('taskStatusSuccess', response.data.data);
		commit('taskStatusSuccess', response.data.data);
		commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const taskPriority = async ({ commit }) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['taskPriority'], null, null).then((response) => {
		commit('taskPriority', response.data.data);
		commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const taskTeamMember = async ({ commit }) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['taskTeamMember'], null, null).then((response) => {
		commit('taskTeamMember', response.data.data);
		commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const taskCategory = async ({ commit }) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['taskCategory'], null, null).then((response) => {
		commit('taskCategory', response.data.data);
		commit('loadingStatus', false)
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const searchTasks = async ({ commit }, params) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['searchTasks'] + '?search=' + params, null, null).then((response) => {
		commit('searchTasksSuccess', response.data.data);
	}).catch((error) => {
			if (error.response.status === 422) {
				commit('errorMsg', error.response.data)
				commit('loadingStatus', false)
			} else if (error.response.status === 500) {
				errorSwal(error.response.data.message)
				commit('loadingStatus', false)
			} else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false)
			}
		})
}

export const latestTask = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['patient']+'/'+id+'/task?latest=latest', null, null).then((response) => {
    if(response.data.data.length > 0) {
      commit('latestTaskSuccess', response.data.data);
    }
    else {
      commit('latestTaskSuccess', null)
    }
	})
		.catch((error) => {
			if (error.response.status == 401) {
				//AuthService.logout();
			}
			commit('failure', error.response.data);
		})
}
