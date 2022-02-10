
import ServiceMethodService from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import router from "@/router"

export const login = async ({ commit }, user) => {

	await ServiceMethodService.login(user).then((response) => {
		localStorage.setItem('user', response.data.user.name);
		localStorage.setItem('token', response.data.token);
		localStorage.setItem('auth', response.data);
		commit('loginSuccess', response.data.user);
		roleAccess()
		
		
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
 const roleAccess = async () =>{
	await ServiceMethodService.common("get", "staff/access", null, null).then((response) => {
		//console.log(response.data.data[0])
		localStorage.setItem('roleAuth', response.data.data[0].roleId);
		router.push({
            path: "/dashboard",
          });
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
	})
}
export const logoutUser = async ({ commit }) => {
	
		localStorage.removeItem('user');
	localStorage.removeItem('token');
    localStorage.removeItem('auth');
	localStorage.removeItem('roleAuth');
	commit('logoutSuccess', 'Success');
	router.push("/")
	
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