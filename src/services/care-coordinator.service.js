import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://ditstekdemo.com/Virtare/public/api/';
const API_URL = 'https://ditstekdemo.com/Virtare-web/public/api/';

class CareCoordinatorService {
  addCareCoordinator(coordinator) {
    return axios
      .post(API_URL + 'carecoordinator', {
        first_name: coordinator.first_name,
        last_name: coordinator.last_name,
        designation: coordinator.designation,
        gender: coordinator.gender,
        email: coordinator.email,
        phone_no: coordinator.phone_no,
        specialization: coordinator.specialization,
        network: coordinator.network,
        email_verify: coordinator.email_verify
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  addCareCoordinatorContact(contact) {
    return axios
      .post(API_URL + 'carecoordinator/contact/'+contact.care_coordinator_id, {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone_no: contact.phone_no,
        care_coordinator_id: contact.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  addCareCoordinatorAvailability(availability) {
    return axios
      .post(API_URL + 'carecoordinator/availability/'+availability.care_coordinator_id, {
        start_time: availability.start_time,
        end_time: availability.end_time,
        care_coordinator_id: availability.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  addCareCoordinatorRole(role) {
    return axios
      .post(API_URL + 'carecoordinator/access/'+role.care_coordinator_id, {
        role: role.role,
        care_coordinator_id: role.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  getCareCoordinatorsList() {
    return axios.get(API_URL + 'carecoordinator/list', { headers: authHeader() });
  }

  getCoordinatorContacts(id) {
    return axios.get(API_URL + 'carecoordinator/contact/'+id, { headers: authHeader() });
  }
  
  getSpecializationsCount(id) {
    return axios.get(API_URL + 'specialization/'+id, { headers: authHeader() });
  }

  getNetworksCount(id) {
    return axios.get(API_URL + 'network/'+id, { headers: authHeader() });
  }

}

export default new CareCoordinatorService();

