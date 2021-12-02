import CareCoordinatorService from '../services/care-coordinator.service';

export const careCoordinator = {
  actions: {
    addCareCoordinator({ commit }, coordinator) {
      return CareCoordinatorService.addCareCoordinator(coordinator).then(
        coordinator => {
          commit('addCareCoordinatorSuccess', coordinator);
          return Promise.resolve(coordinator);
        },
        error => {
          commit('addCareCoordinatorFailure');
          return Promise.reject(error);
        }
      );
    },
    addCareCoordinatorContact({ commit }, contact) {
      return CareCoordinatorService.addCareCoordinatorContact(contact).then(
        contact => {
          commit('addContactSuccess', contact);
          return Promise.resolve(contact);
        },
        error => {
          commit('addContactFailure');
          return Promise.reject(error);
        }
      );
    },
    addCareCoordinatorAvailability({ commit }, availability) {
      return CareCoordinatorService.addCareCoordinatorAvailability(availability).then(
        availability => {
          commit('addAvailabilitySuccess', availability);
          return Promise.resolve(availability);
        },
        error => {
          commit('addAvailabilityFailure');
          return Promise.reject(error);
        }
      );
    },
    addCareCoordinatorRole({ commit }, role) {
      return CareCoordinatorService.addCareCoordinatorRole(role).then(
        role => {
          commit('addRoleSuccess', role);
          return Promise.resolve(role);
        },
        error => {
          commit('addRoleFailure');
          return Promise.reject(error);
        }
      );
    },
    /* async getCareCoordinatorsList({commit}) {
      try {
        let list = await CareCoordinatorService.getCareCoordinatorsList();
        commit('getCareCoordinatorsListSuccess', list)
      }
      catch (error) {
        commit('getCareCoordinatorsListFailure', error);
      }
    }, */
    getCareCoordinatorsList({ commit }) {
      return CareCoordinatorService.getCareCoordinatorsList().then(
        list => {
          commit('getCareCoordinatorsListSuccess', list);
          return Promise.resolve(list);
        },
        error => {
          commit('getCareCoordinatorsListFailure', error);
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    addCareCoordinatorSuccess(state, coordinator) {
      state.coordinator = coordinator;
    },
    addCareCoordinatorFailure(state) {
      state.coordinator = null;
    },
    addContactSuccess(state, contact) {
      state.contact = contact;
    },
    addContactFailure(state) {
      state.contact = null;
    },
    addAvailabilitySuccess(state, availability) {
      state.availability = availability;
    },
    addAvailabilityFailure(state) {
      state.availability = null;
    },
    addRoleSuccess(state, role) {
      state.role = role;
    },
    addRoleFailure(state) {
      state.role = null;
    },
    getCareCoordinatorsListSuccess(state, list) {
      state.list = list;
    },
    getCareCoordinatorsListFailure(state, error) {
      state.list = error;
    }
  }
};