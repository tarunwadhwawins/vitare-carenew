import DashboardService from '../../services/dashboard.service';
import AuthService from '../../services/auth.service';

export const totalPatients = async ({ commit }) => {
    try {
        let resp = await DashboardService.totalPatient()
        commit('totalPatientsSuccess', resp.data.data);
    } catch (error) {

        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const newPatients = async ({ commit }) => {
    try {
        let resp = await DashboardService.newPatient()
        commit('newPatientsSuccess', resp.data.data);
    } catch (error) {
        commit('Failure', error);
    }
}
export const abnormalPatients = async ({ commit }) => {
    try {
        let resp = await DashboardService.abnormalPatient()
        commit('abnormalPatientsSuccess', resp.data.data);
    } catch (error) {
        commit('Failure', error);
    }
}
export const activePatients = async ({ commit }) => {
    try {
        let resp = await DashboardService.activePatient()
        commit('activePatientsSuccess', resp.data.data);
    } catch (error) {
        commit('Failure', error);
    }
}
export const inactivePatients = async ({ commit }) => {
    try {
        let resp = await DashboardService.inactivePatient()
        commit('inactivePatientsSuccess', resp.data.data);
    } catch (error) {
        commit('Failure', error);
    }
}
export const criticalPatients = async ({ commit }) => {
    try {
        let resp = await DashboardService.criticalPatient()
        commit('criticalPatientsSuccess', resp.data.data);
    } catch (error) {
        commit('Failure', error);
    }
}
export const appointment = async ({ commit }, id) => {
    try {
        let resp = await DashboardService.appointment(id)
        if (id == 1) {
            commit('newappointmentSuccess', resp.data.data);
        } else {
            commit('futureappointmentSuccess', resp.data.data);
        }

    } catch (error) {
        commit('Failure', error);
    }
}
export const todayappointment = async ({ commit }) => {
    try {
        let resp = await DashboardService.todayappointment()
        commit('todayappointmentSuccess', resp.data.data);
    } catch (error) {
        commit('Failure', error);
    }
}
export const appointmentcount = async ({ commit }) => {
    try {
        let resp = await DashboardService.appointmentcount()
        commit('appointmentcountSuccess', resp.data);
    } catch (error) {
        commit('Failure', error);
    }
}
export const specialization = async ({ commit }, id) => {
    try {
        let resp = await DashboardService.specialization(id)
        if (id == 1) {
            commit('wellnessSuccess', resp.data.data);
        } else {
            commit('specializationSuccess', resp.data.data);
        }
    } catch (error) {
        commit('Failure', error);
    }
}
export const network = async ({ commit }, id) => {
    try {
        let resp = await DashboardService.network(id)
        if (id == 1) {
            commit('networkinSuccess', resp.data.data);
        } else {
            commit('networkoutSuccess', resp.data.data);
        }
    } catch (error) {
        commit('Failure', error);
    }
}
