import CareCoordinatorService from '../services/care-coordinator.service';
import AuthService from '../services/auth.service';

export const careCoordinator = {
  state: {
    coordinator: null,
    contact: null,
    availability: null,
    role: null,
    file: null,
    document: null,
    coordinatorsList: null,
    contactsList: null,
    availabilityList: null,
    rolesList: null,
    specializationWellness: null,
    specializationBehavour: null,
    networksIn: null,
    networksOut: null,
    contactDetails: null,
    availabilityDetails: null,
    roleDetails: null,
    CoordinatorDetails: null,
    deleteCoordinator: null,
    deleteContact: null,
    deleteAvailability: null,
    deleteRole: null,
    errormsg: null,
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
    async uploadFile({ commit }, file) {
      try {
        let response = await CareCoordinatorService.uploadFile(file)
        commit('uploadFileSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async addCareCoordinatorDocument({ commit }, document) {
      try {
        let response = await CareCoordinatorService.addCareCoordinatorDocument(document)
        commit('addDocumentSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCareCoordinatorsList({ commit }, id) {
      try {
        let response = await CareCoordinatorService.getCareCoordinatorsList(id)
        commit('getCareCoordinatorsListSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCoordinatorDetails({ commit }, id) {
      try {
        let response = await CareCoordinatorService.getCoordinatorDetails(id)
        commit('getCoordinatorDetailsSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async deleteCoordinator({ commit }, id) {
      try {
        let response = await CareCoordinatorService.deleteCoordinator(id)
        commit('deleteCoordinatorSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCoordinatorContacts({ commit }, id) {
      try {
        let response = await CareCoordinatorService.getCoordinatorContacts(id)
        commit('getCoordinatorContactsSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async deleteCoordinatorContact({ commit }, data) {
      try {
        let response = await CareCoordinatorService.deleteCoordinatorContact(data)
        commit('deleteCoordinatorContactSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async deleteCoordinatorAvailability({ commit }, data) {
      try {
        let response = await CareCoordinatorService.deleteCoordinatorAvailability(data)
        commit('deleteCoordinatorAvailabilitySuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async deleteCoordinatorRole({ commit }, data) {
      try {
        let response = await CareCoordinatorService.deleteCoordinatorRole(data)
        commit('deleteCoordinatorRoleSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCoordinatorContactDetails({ commit }, data) {
      try {
        let response = await CareCoordinatorService.getCoordinatorContactDetails(data)
        commit('getCoordinatorContactDetailsSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCoordinatorAvailabilities({ commit }, id) {
      try {
        let response = await CareCoordinatorService.getCoordinatorAvailabilities(id)
        commit('getCoordinatorAvailabilitiesSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCoordinatorAvailabilityDetails({ commit }, data) {
      try {
        let response = await CareCoordinatorService.getCoordinatorAvailabilityDetails(data)
        commit('getCoordinatorAvailabilitySuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCoordinatorRoles({ commit }, id) {
      try {
        let response = await CareCoordinatorService.getCoordinatorRoles(id)
        commit('getCoordinatorRolesSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async getCoordinatorRoleDetails({ commit }, data) {
      try {
        let response = await CareCoordinatorService.getCoordinatorRoleDetails(data)
        commit('getCoordinatorRoleDetailsSuccess', response.data.data);
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async specializationsCount({ commit }, id) {
      try {
        let response = await CareCoordinatorService.specializationsCount(id)
        if (id == 1) {
          commit('specializationWellnessSuccess', response.data.data);
        } else {
          commit('specializationBehavourSuccess', response.data.data);
        }
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
    },
    async networksCount({ commit }, id) {
      try {
        let response = await CareCoordinatorService.networksCount(id)
        if (id == 1) {
          commit('networksInSuccess', response.data.data);
        } else {
          commit('networksOutSuccess', response.data.data);
        }
      }
      catch(error) {
        if(error.message == "Request failed with status code 401") {
          AuthService.logout();
        }
        commit('Failure', error);
      }
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
    uploadFileSuccess(state, file) {
      state.file = file;
    },
    addDocumentSuccess(state, document) {
      state.document = document;
    },
    getCareCoordinatorsListSuccess(state, coordinatorsList) {
      state.coordinatorsList = coordinatorsList;
    },
    getCoordinatorContactsSuccess(state, contactsList) {
      state.contactsList = contactsList;
    },
    getCoordinatorAvailabilitiesSuccess(state, availabilityList) {
      state.availabilityList = availabilityList;
    },
    getCoordinatorRolesSuccess(state, rolesList) {
      state.rolesList = rolesList;
    },
    specializationWellnessSuccess(state, wellness) {
      state.specializationWellness = wellness;
    },
    specializationBehavourSuccess(state, behaviour) {
      state.specializationBehavour = behaviour;
    },
    networksInSuccess(state, networkIn) {
      state.networksIn = networkIn;
    },
    networksOutSuccess(state, networkOut) {
      state.networksOut = networkOut;
    },
    getCoordinatorContactDetailsSuccess(state, contactDetails) {
      state.contactDetails = contactDetails;
    },
    getCoordinatorAvailabilitySuccess(state, availabilityDetails) {
      state.availabilityDetails = availabilityDetails;
    },
    getCoordinatorRoleDetailsSuccess(state, roleDetails) {
      state.roleDetails = roleDetails;
    },
    getCoordinatorDetailsSuccess(state, CoordinatorDetails) {
      state.CoordinatorDetails = CoordinatorDetails;
    },
    deleteCoordinatorSuccess(state, deleteCoordinator) {
      state.deleteCoordinator = deleteCoordinator;
    },
    deleteCoordinatorContactSuccess(state, deleteContact) {
      state.deleteContact = deleteContact;
    },
    deleteCoordinatorAvailabilitySuccess(state, deleteAvailability) {
      state.deleteAvailability = deleteAvailability;
    },
    deleteCoordinatorRoleSuccess(state, deleteRole) {
      state.deleteRole = deleteRole;
    },
    Failure(state, error) {
      state.errormsg = error;
    },
  }
};