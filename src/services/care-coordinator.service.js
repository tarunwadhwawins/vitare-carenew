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
        gender_id: coordinator.gender_id,
        email: coordinator.email,
        phone_no: coordinator.phone_no,
        specialization_id: coordinator.specialization_id,
        network_id: coordinator.network_id,
        email_verify: coordinator.email_verify
      },
      { headers: authHeader() })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  addCareCoordinatorContact(contact) {
    return axios
      .post(API_URL + 'carecoordinator/contact', {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone_no: contact.phone_no,
        care_coordinator_id: contact.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  addCareCoordinatorAvailability(availability) {
    return axios
      .post(API_URL + 'carecoordinator/availability', {
        start_time: availability.start_time,
        end_time: availability.end_time,
        care_coordinator_id: availability.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  addCareCoordinatorRole(role) {
    return axios
      .post(API_URL + 'carecoordinator/access', {
        access_id: role.access_id,
        care_coordinator_id: role.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  getCareCoordinatorsList() {
    return axios.get(API_URL + 'carecoordinator/list', { headers: authHeader() });
  }

}

export default new CareCoordinatorService();

