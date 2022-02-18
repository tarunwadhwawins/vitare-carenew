import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
export const timeLine = async ({ commit }, id) => {
    commit('timelineSuccess', id);
    // await ServiceMethodService.common("get", API_ENDPOINTS['TimeLine'], null, null).then((response) => {

    //         commit('timelineSuccess', response.data.data);

    // }).catch((error) => {
    //     if (error.response.status == 401) {
    //         //AuthService.logout();
    //     }
    //     commit('failure', error.response.data);
    // })
}
// export const todayAppointment = async ({ commit }, id) => {
//     await ServiceMethodService.common("get", API_ENDPOINTS['todayAppointment'] + "?timelineId=" + id, null, null).then((response) => {
//         commit('todayAppointmentSuccess', response.data.data);
//     })
//         .catch((error) => {
//             commit('failure', error.response.data);
//         })

// }
export const callStatus = async ({ commit }, id) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['callStatus'] + "?timelineId=" + id, null, null).then((response) => {
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

export const specialization = async ({ commit }, id) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['specialization'] + "?timelineId=" + id, null, null).then((response) => {
        commit('specializationSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}


export const network = async ({ commit }, id) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['network'] + "?timelineId=" + id, null, null).then((response) => {

        commit('networkSuccess', response.data.data);

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}

export const cptCode = async ({ commit }) => {
    commit('cptCodeSuccess');
    // await ServiceMethodService.common("get", API_ENDPOINTS['CptCode'], null, null).then((response) => {

    //         commit('cptCodeSuccess', response.data.data);

    // }).catch((error) => {
    //     if (error.response.status == 401) {
    //         //AuthService.logout();
    //     }
    //     commit('failure', error.response.data);
    // })
}
export const financial = async ({ commit }) => {
    commit('financialSuccess');
    // await ServiceMethodService.common("get", API_ENDPOINTS['Financial'], null, null).then((response) => {

    //         commit('financialSuccess', response.data.data);

    // }).catch((error) => {
    //     if (error.response.status == 401) {
    //         //AuthService.logout();
    //     }
    //     commit('failure', error.response.data);
    // })
}
export const totalPatientsChart = async ({ commit }, id) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['totalPatientsChart'] + "?timelineId=" + id, null, null).then((response) => {

        commit('totalPatientsChartSuccess', response.data.data);

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const appointmentChart = async ({ commit }, id) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['appointmentChart'] + "?timelineId=" + id, null, null).then((response) => {

        commit('appointmentChartSuccess', response.data.data);

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}