import ServiceMethodService from '@/services/serviceMethod';
import { successSwal, errorSwal } from '@/commonMethods/commonMethod';
import { API_ENDPOINTS } from '@/config/apiConfig';

export const addQuestionnaire = async ({ commit }, data) => {
	await ServiceMethodService.common('post', API_ENDPOINTS['questionnaire'], null, data)
		.then((response) => {
			commit('addQuestionnaire', response.data.data);

			successSwal(response.data.message);

			commit('successMsg', response.data.message);
		})
		.catch((error) => {
			commit('errorMsg', error.response.data.message);

			errorSwal(error.response.data.message);
		});
};
export const questionnaireList = async ({ commit }, data) => {
	await ServiceMethodService.common('get', API_ENDPOINTS['questionnaire'], null, data)
		.then((response) => {
			commit('questionnaireList', response.data);
		})
		.catch((error) => {
			commit('errorMsg', error.response.data.message);

			errorSwal(error.response.data.message);
		});
};
export const detailsQuestionnaire = async ({ commit }, id) => {
	await ServiceMethodService.common('get', API_ENDPOINTS['questionnaire'], id, null)
		.then((response) => {
			commit('detailsQuestionnaire', response.data);
		})
		.catch((error) => {
			commit('errorMsg', error.response.data.message);

			errorSwal(error.response.data.message);
		});
};
export const updateQuestionnaire = async ({ commit }, data) => {
	await ServiceMethodService.common('put', API_ENDPOINTS['questionnaire'], null, data)
		.then((response) => {
			commit('successMsg', response.data.message);

			successSwal(response.data.message);
		})
		.catch((error) => {
			commit('errorMsg', error.response.data.message);

			errorSwal(error.response.data.message);
		});
};
export const deleteQuestionnaire = async ({ commit }, id) => {
	await ServiceMethodService.common('delete', API_ENDPOINTS['questionnaire'], id, null)
		.then((response) => {
			commit('successMsg', response.data.message);

			successSwal(response.data.message);
		})
		.catch((error) => {
			commit('errorMsg', error.response.data.message);

			errorSwal(error.response.data.message);
		});
};
