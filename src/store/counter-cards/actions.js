import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
export const totalPatients = async ({ commit }) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['TotalPaitient'], null, null).then((response) => {
        commit('totalPatientsSuccess', response.data.data);
    })
        .catch((error) => {

            if (error.response.status == 401) {
                //AuthService.logout();
            }
            commit('failure', error.response.data);
        })

}
export const newPatients = async ({ commit }) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['NewPaitient'], null, null).then((response) => {
        commit('newPatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const abnormalPatients = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['AbnormalPaitient'], null, null).then((response) => {
        commit('abnormalPatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const activePatients = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['ActivePaitient'], null, null).then((response) => {
        commit('activePatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const inactivePatients = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['InActivePaitient'], null, null).then((response) => {
        commit('inactivePatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const criticalPatients = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['CriticalPaitient'], null, null).then((response) => {
        commit('criticalPatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}