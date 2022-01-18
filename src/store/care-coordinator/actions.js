import CareCoordinatorService from '../../services/careCoordinator';
import ServiceMethodService from '../../services/serviceMethod';
import AuthService from '../../services/auth';
import { API_ENDPOINTS } from "../../config/apiConfig"
export const callPerStaff = async ({ commit }) => {
    console.log("login")
    await ServiceMethodService.common("get", API_ENDPOINTS['CallPerStaff'], null, null).then((response) => {
        commit('callPerStaffSuccess', response.data.data);
    })
        .catch((error) => {

            if (error.response.status == 401) {
                //AuthService.logout();
            }
            commit('failure', error.response.data);
        })

}
export const addCareCoordinator = async ({ commit }, coordinator) => {
    try {
        let response = await CareCoordinatorService.addCareCoordinator(coordinator)
        commit('addCareCoordinatorSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const addCareCoordinatorContact = async ({ commit }, contact) => {
    try {
        let response = await CareCoordinatorService.addCareCoordinatorContact(contact)
        commit('addContactSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const addCareCoordinatorAvailability = async({ commit }, availability) => {
    try {
        let response = await CareCoordinatorService.addCareCoordinatorAvailability(availability)
        commit('addAvailabilitySuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const addCareCoordinatorRole = async ({ commit }, role) => {
    try {
        let response = await CareCoordinatorService.addCareCoordinatorRole(role)
        commit('addRoleSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const uploadFile = async ({ commit }, file) => {
    try {
        let response = await CareCoordinatorService.uploadFile(file)
        commit('uploadFileSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const addCareCoordinatorDocument = async ({ commit }, document) => {
    try {
        let response = await CareCoordinatorService.addCareCoordinatorDocument(document)
        commit('addDocumentSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCareCoordinatorsList = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.getCareCoordinatorsList(id)
        commit('getCareCoordinatorsListSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCoordinatorDetails = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.getCoordinatorDetails(id)
        commit('getCoordinatorDetailsSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const deleteCoordinator = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.deleteCoordinator(id)
        commit('deleteCoordinatorSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCoordinatorContacts = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.getCoordinatorContacts(id)
        commit('getCoordinatorContactsSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const deleteCoordinatorContact = async ({ commit }, data) => {
    try {
        let response = await CareCoordinatorService.deleteCoordinatorContact(data)
        commit('deleteCoordinatorContactSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const deleteCoordinatorAvailability = async ({ commit }, data) => {
    try {
        let response = await CareCoordinatorService.deleteCoordinatorAvailability(data)
        commit('deleteCoordinatorAvailabilitySuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const deleteCoordinatorRole = async ({ commit }, data) => {
    try {
        let response = await CareCoordinatorService.deleteCoordinatorRole(data)
        commit('deleteCoordinatorRoleSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCoordinatorContactDetails = async ({ commit }, data) => {
    try {
        let response = await CareCoordinatorService.getCoordinatorContactDetails(data)
        commit('getCoordinatorContactDetailsSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCoordinatorAvailabilities = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.getCoordinatorAvailabilities(id)
        commit('getCoordinatorAvailabilitiesSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCoordinatorAvailabilityDetails = async ({ commit }, data) => {
    try {
        let response = await CareCoordinatorService.getCoordinatorAvailabilityDetails(data)
        commit('getCoordinatorAvailabilitySuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCoordinatorRoles = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.getCoordinatorRoles(id)
        commit('getCoordinatorRolesSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const getCoordinatorRoleDetails = async ({ commit }, data) => {
    try {
        let response = await CareCoordinatorService.getCoordinatorRoleDetails(data)
        commit('getCoordinatorRoleDetailsSuccess', response.data.data);
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const specializationsCount = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.specializationsCount(id)
        if (id == 1) {
            commit('specializationWellnessSuccess', response.data.data);
        } else {
            commit('specializationBehavourSuccess', response.data.data);
        }
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}
export const networksCount = async ({ commit }, id) => {
    try {
        let response = await CareCoordinatorService.networksCount(id)
        if (id == 1) {
            commit('networksInSuccess', response.data.data);
        } else {
            commit('networksOutSuccess', response.data.data);
        }
    }
    catch (error) {
        if (error.message == "Request failed with status code 401") {
            AuthService.logout();
        }
        commit('Failure', error);
    }
}