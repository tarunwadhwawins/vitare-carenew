import DashboardService from '../services/dashboard.service';
import AuthService from '../services/auth.service';

export const dashBoard = {
  state: {
    tcount: null,
    ncount: null,
    abcount: null,
    activecount: null,
    inactivecount: null,
    critcount: null,
    newappointment: null,
    futureappointment: null,
    appointmentcount: null,
    specialization: null,
    wellness: null,
    networkin: null,
    networkout: null,
    errormsg:null,
    todayappointment:null,


  },
  actions: {
    async totalPatients({ commit }) {
      try {
        let resp = await DashboardService.totalPatient()
        commit('totalPatientsSuccess', resp.data.data);
      } catch (error) {
        
        if(error.message=="Request failed with status code 401"){
         AuthService.logout();
        }
        commit('totalPatientsFailure', error);
      }
    },
    async newPatients({ commit }) {
      try {
        let resp = await DashboardService.newPatient()
        commit('newPatientsSuccess', resp.data.data);
      } catch (error) {
        commit('newPatientsFailure', error);
      }
    },
    async abnormalPatients({ commit }) {
      try {
        let resp = await DashboardService.abnormalPatient()
        commit('abnormalPatientsSuccess', resp.data.data);
      } catch (error) {
        commit('abnormalPatientsFailure', error);
      }
    },
    async activePatients({ commit }) {
      try {
        let resp = await DashboardService.activePatient()
        commit('activePatientsSuccess', resp.data.data);
      } catch (error) {
        commit('activePatientsFailure', error);
      }
    },
    async inactivePatients({ commit }) {
      try {
        let resp = await DashboardService.inactivePatient()
        commit('inactivePatientsSuccess', resp.data.data);
      } catch (error) {
        commit('inactivePatientsFailure', error);
      }
    },
    async criticalPatients({ commit }) {
      try {
        let resp = await DashboardService.criticalPatient()
        commit('criticalPatientsSuccess', resp.data.data);
      } catch (error) {
        commit('criticalPatientsFailure', error);
      }
    },
    async appointment({ commit },id) {
      try {
        let resp = await DashboardService.appointment(id)
        if(id==1){
          
          commit('newappointmentSuccess', resp.data.data);
        }else{
          commit('futureappointmentSuccess', resp.data.data);
        }
        
      } catch (error) {
        commit('newappointmentFailure', error);
      }
    },
    async todayappointment({ commit }) {
      try {
        let resp = await DashboardService.todayappointment()
        commit('todayappointmentSuccess', resp.data.data);
      } catch (error) {
        commit('todayappointmentFailure', error);
      }
    },
    async appointmentcount({ commit }) {
      try {
        let resp = await DashboardService.appointmentcount()
        commit('appointmentcountSuccess', resp.data);
      } catch (error) {
        commit('appointmentcountFailure', error);
      }
    },
    async specialization({ commit }, id) {
      try {
        let resp = await DashboardService.specialization(id)
        if (id == 1) {
          commit('wellnessSuccess', resp.data.data);
        } else {
          commit('specializationSuccess', resp.data.data);
        }
      } catch (error) {
        commit('specializationFailure', error);
      }
    },
    async network({ commit }, id) {
      try {
        let resp = await DashboardService.network(id)
        if (id == 1) {
          commit('networkinSuccess', resp.data.data);
        } else {
          commit('networkoutSuccess', resp.data.data);
        }
      } catch (error) {
        commit('specializationFailure', error);
      }
    },
  },
  mutations: {
    totalPatientsSuccess(state, count) {
      state.tcount = count;
    },
    totalPatientsFailure(state, error) {
      state.errormsg = error;
    },
    newPatientsSuccess(state, count) {
      state.ncount = count;
    },
    newPatientsFailure(state, error) {
      state.errormsg = error;
    },
    abnormalPatientsSuccess(state, count) {
      state.abcount = count;
    },
    abnormalPatientsFailure(state, error) {
      state.errormsg = error;
    },
    activePatientsSuccess(state, count) {
      state.activecount = count;
    },
    activePatientsFailure(state, error) {
      state.errormsg = error;
    },
    inactivePatientsSuccess(state, count) {
      state.inactivecount = count;
    },
    inactivePatientsFailure(state, error) {
      state.errormsg = error;
    },
    criticalPatientsSuccess(state, count) {
      state.critcount = count;
    },
    criticalPatientsFailure(state, error) {
      state.errormsg = error;
    },
    newappointmentSuccess(state, appointment) {
      state.newappointment = appointment;
    },
    futureappointmentSuccess(state, appointment) {
      state.futureappointment = appointment;
    },
    appointmentFailure(state, error) {
      state.errormsg = error;
    },
    todayappointmentSuccess(state, appointment) {
      state.todayappointment = appointment;
    },
    todayappointmentFailure(state, error) {
      state.errormsg = error;
    },
    appointmentcountSuccess(state, count) {
      state.appointmentcount = count;
    },
    appointmentcountFailure(state, error) {
      state.errormsg = error;
    },
    wellnessSuccess(state, count) {
      state.wellness = count;
    },
    specializationSuccess(state, count) {
      state.specialization = count;
    },
    specializationFailure(state, count) {
      state.errormsg = count;
    },
    networkinSuccess(state, count) {
      state.networkin = count;
    },
    networkoutSuccess(state, count) {
      state.networkout = count;
    },
    networkFailure(state, count) {
      state.errormsg = count;
    },


  }
};