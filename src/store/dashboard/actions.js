import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
//import { startimeAdd, endTimeAdd, timeStamp } from '@/commonMethods/commonMethod'
export const timeLine = async ({ commit }, id) => {
    commit('loadingStatus', true)
await ServiceMethodService.common("get", API_ENDPOINTS['interval'] + "?timelineId=" + id, null, null).then((response) => {
    commit('timelineSuccess', response.data.data);
})
                .catch((error) => {
                    commit('failure', error.response.data);
                })
    
}
// export const todayAppointment = async ({ commit }, id) => {
//     await ServiceMethodService.common("get", API_ENDPOINTS['todayAppointment'] + "?timelineId=" + id, null, null).then((response) => {
//         commit('todayAppointmentSuccess', response.data.data);
//     })
//         .catch((error) => {
//             commit('failure', error.response.data);
//         })

// }
export const callStatus = async ({ commit }, from) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['callStatus'] +"?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {
        commit('callStatusSuccess', response.data.data)

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
// export const patientsStats = async ({ commit }) => {
//     await ServiceMethodService.common("get", API_ENDPOINTS['PatientCondition'], null, null).then((response) => {
//         commit('patientsStatsSuccess', response.data.data);
//     }).catch((error) => {
//         if (error.response.status == 401) {
//             //AuthService.logout();
//         }
//         commit('failure', error.response.data);
//     })
// }

export const specialization = async ({ commit }, from) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['specialization'] +"?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {
        commit('specializationSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}


export const network = async ({ commit }, from) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['network'] +"?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {

        commit('networkSuccess', response.data.data);

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}

export const cptCode = async ({ commit },from) => {
    
    await ServiceMethodService.common("get", API_ENDPOINTS['cptCodeGraph']+"?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {
        commit('financialSuccess',response.data.data);
        commit('cptCodeSuccess',response.data.data);
        
            //commit('cptCodeSuccess', response.data.data);

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}

export const totalPatientsChart = async ({ commit }, from) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['totalPatientsChart'] +"?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {

        commit('totalPatientsChartSuccess', response.data.data);

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const appointmentChart = async ({ commit }, from) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['appointmentChart'] +"?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {

        commit('appointmentChartSuccess', response.data.data);

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}