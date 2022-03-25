import ServiceMethod from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { successSwal, errorSwal } from '@/commonMethods/commonMethod'

export const resetPassword = async ({ commit }, data) => {
	console.log('data', data)
	await ServiceMethod.common("post", API_ENDPOINTS['changePassword'], null, data).then((response) => {
    successSwal(response.data.message)
    commit('errorMsg', null)
	})
	.catch((error) => {
		if(error.response.status == 422) {
      commit('errorMsg', error.response.data)
		}
		else if(error.response.status == 500) {
      errorSwal(error.response.data.message)
		}
		else if (error.response.status == 401) {
			//AuthService.logout()
		}
		commit('failure', error.response.data)
	})
}

export const forgotPassword = async ({ commit }, data) => {
	console.log('data', data)
	await ServiceMethod.common("post", API_ENDPOINTS['forgotPassword']+`?email=${data.email}`, null, null).then((response) => {
    successSwal(response.data.message)
    commit('errorMsg', null)
	})
	.catch((error) => {
		if(error.response.status == 422) {
      commit('errorMsg', error.response.data)
		}
		else if(error.response.status == 500) {
      errorSwal(error.response.data.message)
		}
		else if (error.response.status == 401) {
			//AuthService.logout()
		}
		commit('failure', error.response.data)
	})
}