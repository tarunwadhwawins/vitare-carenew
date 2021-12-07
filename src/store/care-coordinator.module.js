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
    addCareCoordinatorDocument({ commit }, document) {
      return CareCoordinatorService.addCareCoordinatorDocument(document).then(
        document => {
          commit('addDocumentSuccess', document);
          return Promise.resolve(document);
        },
        error => {
          commit('addDocumentFailure');
          return Promise.reject(error);
        }
      );
    },
    uploadFile({ commit }, file) {
      // console.log('file 1', file);
      return CareCoordinatorService.uploadFile(file).then(
        file => {
          commit('uploadFileSuccess', file);
          return Promise.resolve(file);
        },
        error => {
          commit('uploadFileFailure');
          return Promise.reject(error);
        }
      );
    },

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
    getCoordinatorContacts({ commit }, id) {
      return CareCoordinatorService.getCoordinatorContacts(id).then(
        contacts => {
          commit('getCoordinatorContactsSuccess', contacts);
          return Promise.resolve(contacts);
        },
        error => {
          commit('getCoordinatorContactsFailure', error);
          return Promise.reject(error);
        }
      );
    },
    getCoordinatorAvailabilities({ commit }, id) {
      return CareCoordinatorService.getCoordinatorAvailabilities(id).then(
        contacts => {
          commit('getCoordinatorAvailabilitiesSuccess', contacts);
          return Promise.resolve(contacts);
        },
        error => {
          commit('getCoordinatorAvailabilitiesFailure', error);
          return Promise.reject(error);
        }
      );
    },
    getCoordinatorRoles({ commit }, id) {
      return CareCoordinatorService.getCoordinatorRoles(id).then(
        contacts => {
          commit('getCoordinatorRolesSuccess', contacts);
          return Promise.resolve(contacts);
        },
        error => {
          commit('getCoordinatorRolesFailure', error);
          return Promise.reject(error);
        }
      );
    },
    getSpecializationsCount({ commit }, id) {
      return CareCoordinatorService.getSpecializationsCount(id).then(
        count => {
          commit('getSpecializationsCountSuccess', count);
          return Promise.resolve(count);
        },
        error => {
          commit('getSpecializationsCountFailure', error);
          return Promise.reject(error);
        }
      );
    },
    getNetworkCount({ commit }, id) {
      return CareCoordinatorService.getNetworkCount(id).then(
        count => {
          commit('getNetworkCountSuccess', count);
          return Promise.resolve(count);
        },
        error => {
          commit('getNetworkCountFailure', error);
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
    addDocumentSuccess(state, document) {
      state.document = document;
    },
    addDocumentFailure(state) {
      state.document = null;
    },
    uploadFileSuccess(state, file) {
      state.file = file;
    },
    uploadFileFailure(state) {
      state.file = null;
    },
    getCareCoordinatorsListSuccess(state, list) {
      state.list = list;
    },
    getCareCoordinatorsListFailure(state, error) {
      state.list = error;
    },
    getCoordinatorContactsSuccess(state, contacts) {
      state.contacts = contacts;
    },
    getCoordinatorContactsFailure(state, error) {
      state.contacts = error;
    },
    getCoordinatorAvailabilitiesSuccess(state, availability) {
      state.availability = availability;
    },
    getCoordinatorAvailabilitiesFailure(state, error) {
      state.availability = error;
    },
    getCoordinatorRolesSuccess(state, roles) {
      state.roles = roles;
    },
    getCoordinatorRolesFailure(state, error) {
      state.roles = error;
    },
    getSpecializationsCountSuccess(state, count) {
      state.count = count;
    },
    getSpecializationsCountFailure(state, error) {
      state.count = error;
    },
    getNetworkCountSuccess(state, count) {
      state.count = count;
    },
    getNetworkCountFailure(state, error) {
      state.count = error;
    },
  }
};