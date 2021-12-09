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
        commit('Failure', error);
      }
    },
    async newPatients({ commit }) {
      try {
        let resp = await DashboardService.newPatient()
        commit('newPatientsSuccess', resp.data.data);
      } catch (error) {
        commit('Failure', error);
      }
    },
    async abnormalPatients({ commit }) {
      try {
        let resp = await DashboardService.abnormalPatient()
        commit('abnormalPatientsSuccess', resp.data.data);
      } catch (error) {
        commit('Failure', error);
      }
    },
    async activePatients({ commit }) {
      try {
        let resp = await DashboardService.activePatient()
        commit('activePatientsSuccess', resp.data.data);
      } catch (error) {
        commit('Failure', error);
      }
    },
    async inactivePatients({ commit }) {
      try {
        let resp = await DashboardService.inactivePatient()
        commit('inactivePatientsSuccess', resp.data.data);
      } catch (error) {
        commit('Failure', error);
      }
    },
    async criticalPatients({ commit }) {
      try {
        let resp = await DashboardService.criticalPatient()
        commit('criticalPatientsSuccess', resp.data.data);
      } catch (error) {
        commit('Failure', error);
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
        commit('Failure', error);
      }
    },
    async todayappointment({ commit }) {
      try {
        let resp = await DashboardService.todayappointment()
        commit('todayappointmentSuccess', resp.data.data);
      } catch (error) {
        commit('Failure', error);
      }
    },
    async appointmentcount({ commit }) {
      try {
        let resp = await DashboardService.appointmentcount()
        commit('appointmentcountSuccess', resp.data);
      } catch (error) {
        commit('Failure', error);
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
        commit('Failure', error);
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
        commit('Failure', error);
      }
    },
  },
  mutations: {
    totalPatientsSuccess(state, count) {
      state.tcount = count;
    },
    Failure(state, error) {
      state.errormsg = error;
    },
    newPatientsSuccess(state, count) {
      state.ncount = count;
    },
    
    abnormalPatientsSuccess(state, count) {
      state.abcount = count;
    },
    
    activePatientsSuccess(state, count) {
      state.activecount = count;
    },
   
    inactivePatientsSuccess(state, count) {
      state.inactivecount = count;
    },
    
    criticalPatientsSuccess(state, count) {
      state.critcount = count;
    },
    
    newappointmentSuccess(state, appointment) {
      state.newappointment = appointment;
    },
    futureappointmentSuccess(state, appointment) {
      state.futureappointment = appointment;
    },
    
    todayappointmentSuccess(state, appointment) {
      state.todayappointment = appointment;
    },
    
    appointmentcountSuccess(state, count) {
      state.appointmentcount = count;
    },
    
    wellnessSuccess(state, count) {
      state.wellness = count;
    },
    specializationSuccess(state, count) {
      state.specialization = count;
    },
    
    networkinSuccess(state, count) {
      state.networkin = count;
    },
    networkoutSuccess(state, count) {
      state.networkout = count;
    },


  }
};