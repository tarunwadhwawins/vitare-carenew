
import ServiceMethodService from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { errorSwal, successSwal } from '../../commonMethods/commonMethod'
import router from "@/router"

export const login = async ({ commit }, user) => {
	await ServiceMethodService.login(user).then((response) => {
		localStorage.setItem('user', response.data.user.name);
		localStorage.setItem('token', response.data.token);
		localStorage.setItem('auth', JSON.stringify(response.data));
		commit('loginSuccess', response.data.user);
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
	localStorage.removeItem('token');
	localStorage.removeItem('auth');
	localStorage.removeItem('roleAuth');
	localStorage.removeItem('access');
	localStorage.removeItem('accessPermission');
	localStorage.removeItem('permission');
	commit('logoutSuccess', 'Success');
	// router.push("/")
	router.go();

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

		commit('refreshTokenSuccess', response.data.data);
	})
		.catch((error) => {
			if (error.response.status == 401) {
				//AuthService.logout();
			}
			commit('failure', error.response.data);
		})
}