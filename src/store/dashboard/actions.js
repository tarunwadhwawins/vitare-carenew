import DashboardService from '../../services/dashboard.service';
import AuthService from '../../services/auth.service';

export const totalPatients = async ({ commit }) => {
     await DashboardService.totalPatient().then((response) => {
        commit('totalPatientsSuccess', response.data.data);
    })
        .catch((error) => {
            if (error.status == 401) {
                AuthService.logout();
            }
            commit('failure', error.response.data);
        })

}
export const newPatients = async ({ commit }) => {
         await DashboardService.newPatient().then((response) => {
        commit('newPatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const abnormalPatients = async ({ commit }) => {
    
         await DashboardService.abnormalPatient().then((response) => {
        commit('abnormalPatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const activePatients = async ({ commit }) => {
    
     await DashboardService.activePatient().then((response) => {
        commit('activePatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const inactivePatients = async ({ commit }) => {

         await DashboardService.inactivePatient().then((response) => {
        commit('inactivePatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const criticalPatients = async ({ commit }) => {
    
         await DashboardService.criticalPatient().then((response) => {
        commit('criticalPatientsSuccess', response.data.data);
    }).catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const appointment = async ({ commit }, id) => {
   
     await DashboardService.appointment(id).then((response) => {
        if (id == 1) {
            commit('newappointmentSuccess', response.data.data);
        } else {
            commit('futureappointmentSuccess', response.data.data);
        }

    }) .catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const todayappointment = async ({ commit }) => {
     await DashboardService.todayappointment().then((response) => {
        commit('todayappointmentSuccess', response.data.data);
    }).catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
export const appointmentcount = async ({ commit }) => {
     await DashboardService.appointmentcount().then((response) => {
        commit('appointmentcountSuccess', response.data);
    }).catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
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
        if (error.status == 401) {
            AuthService.logout();
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
    }) .catch((error) => {
        if (error.status == 401) {
            AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
