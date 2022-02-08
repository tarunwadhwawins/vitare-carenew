import AuthService from '../../services/auth';
import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
import router from "@/router"

export const login = async ({ commit }, user) => {
	await AuthService.login(user).then((response) => {
		localStorage.setItem('user', JSON.stringify(response.data.user));
		localStorage.setItem('token', response.data.token);
		commit('loginSuccess', response.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			commit('failure', 'Invalid Login Credentials');
		}
		else {
			commit('failure', error);
		}
	})
}

export const logoutUser = async ({ commit }) => {
	localStorage.removeItem('user');
	localStorage.removeItem('auth');
	localStorage.removeItem('token');
	router.push("/")
	commit('logoutSuccess', 'Success');
	// await ServiceMethodService.common("post", API_ENDPOINTS['logout'], null, null).then((response) => {
	// 	console.log('response', response);
	// 	console.log('logoutSuccess', response.data);
	// 	commit('logoutSuccess', response.data.data);
	// })
	// .catch((error) => {
	// 	if (error.response.status == 401) {
	// 		//AuthService.logout();
	// 	}
	// 	commit('failure', error.response.data);
	// })
}

export const refreshToken = async ({ commit }) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['refreshToken'], null, null).then((response) => {
		console.log('response', response);
		console.log('refreshTokenSuccess', response.data);
		commit('refreshTokenSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}