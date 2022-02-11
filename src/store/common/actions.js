import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"

export const globalCodes = async ({
  commit
}) => {
  await ServiceMethodService.common("get", "globalCodeCategory", null, null).then((response) => {
     
    commit('globalCodes', response.data.data);
    
  }).catch((error) => {
    if (error.response.status == 401) {
      //AuthService.logout();
    }
    commit('failure', error.response.data);
  })
}
export const permissions = async ({
  commit
}) => {

    commit('dashboardPermissions', localStorage.getItem('roleAuth'));

    commit('patientsPermissions', localStorage.getItem('roleAuth'));
    commit('staffPermissions', localStorage.getItem('roleAuth'));
 
}

export const staffList = async ({ commit }) => {
	await ServiceMethodService.common("get", API_ENDPOINTS['staffList'], null, null).then((response) => {
		commit('staffListSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}


