import ServiceMethodService from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"
import { errorLogWithDeviceInfo} from '@/commonMethods/commonMethod'

export const addNote = async ({ commit }, { id, data }) => {
	console.log('data', data)
	await ServiceMethodService.common("post", API_ENDPOINTS['patient'] + '/' + id + '/notes', null, data).then((response) => {
		commit('addNoteSuccess', response.data.data);
	})
		.catch((error) => {
			errorLogWithDeviceInfo(error.response)
			if (error.response.status == 401) {
				//AuthService.logout();
			}
			commit('failure', error.response.data);
		})
}

export const notesList = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['patient'] + '/' + id + '/notes', null, null).then((response) => {
		commit('notesListSuccess', response.data.data);
	})
		.catch((error) => {
			errorLogWithDeviceInfo(error.response)
			if (error.response.status == 401) {
				//AuthService.logout();
			}
			commit('failure', error.response.data);
		})
}

export const latestNotes = async ({ commit }, id) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['patient'] + '/' + id + '/notes' + '?latest=latest', null, null).then((response) => {
		if (response.data.data.length > 0) {
			commit('latestNotesSuccess', response.data.data);
		}
		else {
			commit('latestNotesSuccess', null)
		}
	})
		.catch((error) => {
			errorLogWithDeviceInfo(error.response)
			if (error.response.status == 401) {
				//AuthService.logout();
			}
			commit('failure', error.response.data);
		})
}