
import ServiceMethodService from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { errorSwal, successSwal } from '../../commonMethods/commonMethod'
import router from "@/router";

let date = new Date();
export const login = async ({ commit }, user) => {	
	await ServiceMethodService.login(user).then((response) => {
		localStorage.setItem('user', response.data.user);
		localStorage.setItem('token', response.data.token);
		localStorage.setItem('auth', JSON.stringify(response.data));
		localStorage.setItem('expiresIn', date.setSeconds(date.getSeconds() + ((response.data.expiresIn/100)-10)));
		commit('loginSuccess', response.data);
		roleAccess({ commit })

	})
		.catch((error) => {
			if (error.response.status == 401) {
				commit('loginFailure', 'Invalid Login Credentials');
			}
			else {
				commit('loginFailure', error);
			}
		})
}
const roleAccess = async ({ commit }) => {
	await ServiceMethodService.common("get", "staff/access", null, null).then((response) => {
		commit('accessPermission', response.data.data.length)
		localStorage.setItem('accessPermission', response.data.data.length)
		console.log("access", response.data)
		localStorage.setItem('access', true)
		localStorage.setItem('roleAuth', response.data.data[0] ? response.data.data[0].roleId : '');
		permission({ commit })

	})
		.catch((error) => {
			errorSwal(error.response.data.message)
		})
}
const permission = async ({ commit }) => {
	await ServiceMethodService.common("get", "staff/access/action", null, null).then((response) => {

		if (response.data.actionId.length == 0) {
			successSwal("You don't have permission")
			logoutUser({ commit })
		} else {
			localStorage.setItem('permission', JSON.stringify(response.data))
			router.push({
				path: "/dashboard"
			});
		}

	})
		.catch((error) => {
			errorSwal(error.response.data.message)
		})
}
export const logoutUser = async ({ commit }) => {
	localStorage.removeItem('user');
	localStorage.removeItem('staff');
	localStorage.removeItem('token');
	localStorage.removeItem('auth');
	localStorage.removeItem('roleAuth');
	localStorage.removeItem('access');
	localStorage.removeItem('accessPermission');
	localStorage.removeItem('permission');
	commit('logoutSuccess', 'Success');
	localStorage.removeItem('fireBaseToken')
	localStorage.removeItem('expiresIn')

	// router.push("/")
	router.go();
}

export const refreshToken = async ({ commit }) => {
	await ServiceMethodService.common("post", API_ENDPOINTS['refreshToken'], null, true).then((response) => {
		commit('refreshTokenSuccess', response.data);
		console.log('token', response.data.token);
		localStorage.setItem('token', response.data.token);
		commit('expiresIn', date.setSeconds(date.getSeconds() + ((response.data.expiresIn/100)-10)))
	})
		.catch((error) => {
			if (error.response.status == 401) {
				//AuthService.logout();
			}
			commit('failure', error.response.data);
		})
}


