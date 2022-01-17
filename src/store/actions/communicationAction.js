import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
export const callPerStaff = async ({ commit }) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['CallPerStaff'], null, null).then((response) => {
        commit('callPerStaffSuccess', response.data.data);
    })
        .catch((error) => {

            if (error.response.status == 401) {
                //AuthService.logout();
            }
            commit('failure', error.response.data);
        })

}