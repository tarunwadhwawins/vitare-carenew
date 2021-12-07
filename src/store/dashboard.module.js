import DashboardService from '../services/dashboard.service';

export const dashBoard = {
  actions: {
    totalPatients({ commit }) {
      return DashboardService.totalPatient().then(
        count => {
          commit('totalPatientsSuccess', count.data);
          return Promise.resolve(count.data);
        },
        error => {
          commit('totalPatientsFailure');
          return Promise.reject(error);
        }
      );
    },
  newPatients({ commit }) {
    return DashboardService.newPatient().then(
      count => {
        commit('newPatientsSuccess', count.data);
        return Promise.resolve(count.data);
      },
      error => {
        commit('newPatientsFailure');
        return Promise.reject(error);
      }
    );
  },
  abnormalPatients({ commit }) {
    return DashboardService.abnormalPatient().then(
      count => {
        commit('abnormalPatientsSuccess', count.data);
        return Promise.resolve(count.data);
      },
      error => {
        commit('abnormalPatientsFailure');
        return Promise.reject(error);
      }
    );
  },
  activePatients({ commit }) {
    return DashboardService.activePatient().then(
      count => {
        commit('activePatientsSuccess', count.data);
        return Promise.resolve(count.data);
      },
      error => {
        commit('activePatientsFailure');
        return Promise.reject(error);
      }
    );
  },
  inactivePatients({ commit }) {
    return DashboardService.inactivePatient().then(
      count => {
        commit('inactivePatientsSuccess', count.data);
        return Promise.resolve(count.data);
      },
      error => {
        commit('inactivePatientsFailure');
        return Promise.reject(error);
      }
    );
  },
  criticalPatients({ commit }) {
    return DashboardService.criticalPatient().then(
      count => {
        commit('criticalPatientsSuccess', count.data);
        return Promise.resolve(count.data);
      },
      error => {
        commit('criticalPatientsFailure');
        return Promise.reject(error);
      }
    );
  },
},
  mutations: {
    totalPatientsSuccess(state, count) {
      state.count = count;
    },
    totalPatientsFailure(state) {
      state.count = null;
    },
    newPatientsSuccess(state, count) {
      state.count = count;
    },
    newPatientsFailure(state) {
      state.count = null;
    },
    abnormalPatientsSuccess(state, count) {
      state.count = count;
    },
    abnormalPatientsFailure(state) {
      state.count = null;
    },
    activePatientsSuccess(state, count) {
      state.count = count;
    },
    activePatientsFailure(state) {
      state.count = null;
    },
    inactivePatientsSuccess(state, count) {
      state.count = count;
    },
    inactivePatientsFailure(state) {
      state.count = null;
    },
    criticalPatientsSuccess(state, count) {
      state.count = count;
    },
    criticalPatientsFailure(state) {
      state.count = null;
    },
    
  }
};