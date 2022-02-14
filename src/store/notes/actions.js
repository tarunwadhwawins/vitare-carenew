import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const addNote = async ({ commit }, data) => {
	console.log('data', data)
	await ServiceMethodService.common("post", API_ENDPOINTS['notes'], null, data).then((response) => {
		commit('addNoteSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const notesList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['notes'], null, null).then((response) => {
		commit('notesListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}