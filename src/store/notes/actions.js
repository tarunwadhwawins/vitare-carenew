import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const addNote = async ({ commit }, {id, data}) => {
	console.log('data', data)
	await ServiceMethodService.common("post", API_ENDPOINTS['patient']+'/'+id+'/notes', null, data).then((response) => {
		commit('addNoteSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const notesList = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['patient']+'/'+id+'/notes', null, null).then((response) => {
		commit('notesListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const latestNotes = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['patient']+'/'+id+'/notes'+'?latest=latest&id='+id, null, null).then((response) => {
		commit('latestNotesSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}