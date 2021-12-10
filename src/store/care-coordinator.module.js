import CareCoordinatorService from '../services/care-coordinator.service';
import AuthService from '../services/auth.service';

export const careCoordinator = {
  state: {
    coordinator: null,
    contact: null,
    availability: null,
    role: null,
  },
  actions: {
    async addCareCoordinator({ commit }, coordinator) {
      try {
        let response = await CareCoordinatorService.addCareCoordinator(coordinator)
        commit('addCareCoordinatorSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async addCareCoordinatorContact({ commit }, contact) {
      try {
        let response = await CareCoordinatorService.addCareCoordinatorContact(contact)
        commit('addContactSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async addCareCoordinatorAvailability({ commit }, availability) {
      try {
        let response = await CareCoordinatorService.addCareCoordinatorAvailability(availability)
        commit('addAvailabilitySuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async addCareCoordinatorRole({ commit }, role) {
      try {
        let response = await CareCoordinatorService.addCareCoordinatorRole(role)
        commit('addRoleSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
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
    getCareCoordinatorsList({ commit }, id) {
      return CareCoordinatorService.getCareCoordinatorsList(id).then(
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
    getCoordinatorDetails({ commit }, id) {
      return CareCoordinatorService.getCoordinatorDetails(id).then(
        list => {
          commit('getCoordinatorDetailsSuccess', list);
          return Promise.resolve(list);
        },
        error => {
          commit('getCoordinatorDetailsFailure', error);
          return Promise.reject(error);
        }
      );
    },
    deleteCoordinator({ commit }, id) {
      return CareCoordinatorService.deleteCoordinator(id).then(
        list => {
          commit('deleteCoordinatorSuccess', list);
          return Promise.resolve(list);
        },
        error => {
          commit('deleteCoordinatorFailure', error);
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
    deleteCoordinatorContact({ commit }, data) {
      return CareCoordinatorService.deleteCoordinatorContact(data).then(
        list => {
          commit('deleteCoordinatorContactSuccess', list);
          return Promise.resolve(list);
        },
        error => {
          commit('deleteCoordinatorContactFailure', error);
          return Promise.reject(error);
        }
      );
    },
    deleteCoordinatorAvailability({ commit }, data) {
      return CareCoordinatorService.deleteCoordinatorAvailability(data).then(
        list => {
          commit('deleteCoordinatorAvailabilitySuccess', list);
          return Promise.resolve(list);
        },
        error => {
          commit('deleteCoordinatorAvailabilityFailure', error);
          return Promise.reject(error);
        }
      );
    },
    deleteCoordinatorRole({ commit }, data) {
      return CareCoordinatorService.deleteCoordinatorRole(data).then(
        list => {
          commit('deleteCoordinatorRoleSuccess', list);
          return Promise.resolve(list);
        },
        error => {
          commit('deleteCoordinatorRoleFailure', error);
          return Promise.reject(error);
        }
      );
    },
    getCoordinatorContactDetails({ commit }, data) {
      return CareCoordinatorService.getCoordinatorContactDetails(data).then(
        contacts => {
          commit('getCoordinatorContactDetailsSuccess', contacts);
          return Promise.resolve(contacts);
        },
        error => {
          commit('getCoordinatorContactDetailsFailure', error);
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
    getCoordinatorAvailabilityDetails({ commit }, data) {
      return CareCoordinatorService.getCoordinatorAvailabilityDetails(data).then(
        contacts => {
          commit('getCoordinatorAvailabilitySuccess', contacts);
          return Promise.resolve(contacts);
        },
        error => {
          commit('getCoordinatorAvailabilityFailure', error);
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
    getCoordinatorRoleDetails({ commit }, data) {
      return CareCoordinatorService.getCoordinatorRoleDetails(data).then(
        contacts => {
          commit('getCoordinatorRoleDetailsSuccess', contacts);
          return Promise.resolve(contacts);
        },
        error => {
          commit('getCoordinatorRoleDetailsFailure', error);
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
    addContactSuccess(state, contact) {
      state.contact = contact;
    },
    addAvailabilitySuccess(state, availability) {
      state.availability = availability;
    },
    addRoleSuccess(state, role) {
      state.role = role;
    },
    addDocumentSuccess(state, document) {
      state.document = document;
    },
    uploadFileSuccess(state, file) {
      state.file = file;
    },
    getCareCoordinatorsListSuccess(state, list) {
      state.list = list;
    },
    getCoordinatorContactsSuccess(state, contacts) {
      state.contacts = contacts;
    },
    getCoordinatorAvailabilitiesSuccess(state, availability) {
      state.availability = availability;
    },
    getCoordinatorRolesSuccess(state, roles) {
      state.roles = roles;
    },
    getSpecializationsCountSuccess(state, count) {
      state.count = count;
    },
    getNetworkCountSuccess(state, count) {
      state.count = count;
    },
    getCoordinatorContactDetailsSuccess(state, contact) {
      state.contact = contact;
    },
    getCoordinatorAvailabilitySuccess(state, availability) {
      state.availability = availability;
    },
    getCoordinatorRoleDetailsSuccess(state, role) {
      state.role = role;
    },
    getCoordinatorDetailsSuccess(state, coordinator) {
      state.coordinator = coordinator;
    },
    deleteCoordinatorSuccess(state, coordinator) {
      state.coordinator = coordinator;
    },
    deleteCoordinatorContactSuccess(state, coordinator) {
      state.coordinator = coordinator;
    },
    deleteCoordinatorAvailabilitySuccess(state, coordinator) {
      state.coordinator = coordinator;
    },
    deleteCoordinatorRoleSuccess(state, coordinator) {
      state.coordinator = coordinator;
    },
    Failure(state, error) {
      state.errormsg = error;
    },
  }
};