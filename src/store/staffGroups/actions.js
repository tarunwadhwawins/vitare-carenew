import ServiceMethodService from '@/services/serviceMethod';
import {
	successSwal,
	errorSwal,
	// errorLogWithDeviceInfo
} from '@/commonMethods/commonMethod';
import { API_ENDPOINTS } from '@/config/apiConfig';

export const createGroup = async ({ commit }, data) => {
	console.log('createGroup data', data)
	await ServiceMethodService.common('post', API_ENDPOINTS['group'], null, data).then((response) => {
		console.log('createGroup Response', response.data);
		commit('createGroup', response.data.data);
		successSwal(response.data.message);
	})
	.catch((error) => {
		console.log('createGroup error', error)
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const updateGroup = async ({ commit }, data) => {
	await ServiceMethodService.common('put', API_ENDPOINTS['group'], data.id, data.data).then((response) => {
		commit('updateGroup', response.data.data);
		successSwal(response.data.message);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const groupsList = async ({ commit }) => {
	await ServiceMethodService.common('get', API_ENDPOINTS['group'], null, null).then((response) => {
		commit('groupsList', response.data.data);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const groupDetails = async ({ commit }, id) => {
	await ServiceMethodService.common('get', API_ENDPOINTS['group'], id, null).then((response) => {
		commit('groupDetails', response.data.data);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const deleteGroup = async ({ commit }, id) => {
	await ServiceMethodService.common('delete', API_ENDPOINTS['group'], id, null).then((response) => {
		successSwal(response.data.message);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const searchStaff = async ({ commit }, staff) => {
	console.log('searchStaff', staff)
	await ServiceMethodService.common('get', API_ENDPOINTS['staff']+`?search=${staff}`, null, null).then((response) => {
		commit('searchStaff', response.data.data);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const searchProgram = async ({ commit }, program) => {
	await ServiceMethodService.common('get', API_ENDPOINTS['program']+`?active=1&search=${program}`, null, null).then((response) => {
		commit('searchProgram', response.data.data);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const searchProvider = async ({ commit }, provider) => {
	await ServiceMethodService.common('get', API_ENDPOINTS['provider']+`?active=1&search=${provider}`, null, null).then((response) => {
		commit('searchProvider', response.data.data);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const addStaffToGroup = async ({ commit }, data) => {
	await ServiceMethodService.common('post', API_ENDPOINTS['staffGroup'], data.id, data.data).then((response) => {
		successSwal(response.data.message);
		commit('addStaffToGroup', response.data.data);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};

export const groupStaffList = async ({ commit }, id) => {
	await ServiceMethodService.common('get', API_ENDPOINTS['group']+`/${id}/staff`, null, null).then((response) => {
		commit('groupStaffList', response.data.data);
	})
	.catch((error) => {
		if(error.response) {
			if(error.response.status === 422) {
				commit('errorMsg', error.response.data);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 500) {
				errorSwal(error.response.data.message);
				commit('loadingStatus', false);
			}
			else if (error.response.status === 401) {
				// commit('errorMsg', error.response.data.message)
				commit('loadingStatus', false);
			}
		}
	});
};