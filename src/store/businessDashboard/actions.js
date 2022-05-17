import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
import { errorLogWithDeviceInfo } from '@/commonMethods/commonMethod'

export const cptCode = async ({ commit }, from) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['cptCodeGraph'] + "?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {

        commit('cptCodeSuccess', response.data.data);

        //commit('cptCodeSuccess', response.data.data);

    }).catch((error) => {
        errorLogWithDeviceInfo(error.response)
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const financial = async ({ commit }, from) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['financial'] + "?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {
        commit('financialSuccess', response.data.data);


        //commit('cptCodeSuccess', response.data.data);

    }).catch((error) => {
        errorLogWithDeviceInfo(error.response)
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const referalCount = async ({ commit }, from) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['referalCount'] + "?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {
        commit('referalCount', response.data.data);


        //commit('cptCodeSuccess', response.data.data);

    }).catch((error) => {
        errorLogWithDeviceInfo(error.response)
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}


