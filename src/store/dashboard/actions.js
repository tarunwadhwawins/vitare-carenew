import ServiceMethodService from '../../services/serviceMethod';
import { API_ENDPOINTS } from "../../config/apiConfig"
export const timeLine = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['TimeLine'], null, null).then((response) => {
       
            commit('timelineSuccess', response.data.data);
       
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const todayAppointment = async ({ commit }) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['TodayAppointment'], null, null).then((response) => {
        commit('todayAppointmentSuccess', response.data.data);
    })
        .catch((error) => {
            commit('failure', error.response.data);
        })

}
export const callStatus = async ({ commit }) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['CallStatus'], null, null).then((response) => {
       commit('callStatusSuccess',response.data.data)

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const patientsStats = async ({ commit }) => {
    await ServiceMethodService.common("get", API_ENDPOINTS['PatientCondition'], null, null).then((response) => {
        commit('patientsStatsSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}

export const specialization = async ({ commit }, id) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['Specialization'], id, null).then((response) => {
            commit('specializationSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}


export const network = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['Network'], null, null).then((response) => {
       
            commit('networkSuccess', response.data.data);
       
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}

export const cptCode = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['CptCode'], null, null).then((response) => {
       
            commit('cptCodeSuccess', response.data.data);
       
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const financial = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['Financial'], null, null).then((response) => {
       
            commit('financialSuccess', response.data.data);
       
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const totalPatientsChart = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['TotalPatientsChart'], null, null).then((response) => {
       
            commit('totalPatientsChartSuccess', response.data.data);
       
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const appointmentChart = async ({ commit }) => {

    await ServiceMethodService.common("get", API_ENDPOINTS['AppointmentChart'], null, null).then((response) => {
       
            commit('appointmentChartSuccess', response.data.data);
       
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const widgettype =  ({ commit },data) => {
            commit('widget', data);
}