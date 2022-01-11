import DashboardService from '../../services/dashboard';
// import AuthService from '../../services/auth';


export const appointment = async ({ commit }, id) => {

    await DashboardService.appointment(id).then((response) => {
        if (id == 1) {
            commit('newappointmentSuccess', response.data.data);
        } else {
            commit('futureappointmentSuccess', response.data.data);
        }

    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const todayappointment = async ({ commit }) => {
    await DashboardService.todayappointment().then((response) => {
        commit('todayappointmentSuccess', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const appointmentcount = async ({ commit }) => {
    await DashboardService.appointmentcount().then((response) => {
        commit('appointmentcountSuccess', response.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const specialization = async ({ commit }, id) => {

    await DashboardService.specialization(id).then((response) => {
        if (id == 1) {
            commit('wellnessSuccess', response.data.data);
        } else {
            commit('specializationSuccess', response.data.data);
        }
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const network = async ({ commit }, id) => {

    await DashboardService.network(id).then((response) => {
        if (id == 1) {
            commit('networkinSuccess', response.data.data);
        } else {
            commit('networkoutSuccess', response.data.data);
        }
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}