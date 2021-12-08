import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://ditstekdemo.com/Virtare/public/api/';
const API_URL = 'https://ditstekdemo.com/Virtare-web/public/api/';

class CareCoordinatorService {
  addCareCoordinator(coordinator) {
    if(coordinator.coordinatorId != null) {
      return axios.put(API_URL + 'carecoordinator'+coordinator.coordinatorId, {
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
    else {
      return axios.post(API_URL + 'carecoordinator', {
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
  }

  addCareCoordinatorContact(contact) {
    if(contact.contactId != null) {
      return axios
        .put(API_URL + 'carecoordinator/'+contact.care_coordinator_id+'/contact/'+contact.contactId, {
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
    else {
      return axios
        .post(API_URL + 'carecoordinator/'+contact.care_coordinator_id+'/contact', {
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
  }

  addCareCoordinatorAvailability(availability) {
    if(availability.availabilityId != null) {
      return axios.put(API_URL + 'carecoordinator/'+availability.care_coordinator_id+'/availability/'+availability.availabilityId, {
        start_time: availability.start_time,
        end_time: availability.end_time,
        care_coordinator_id: availability.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
    }
    else {
      return axios.post(API_URL + 'carecoordinator/'+availability.care_coordinator_id+'/availability', {
        start_time: availability.start_time,
        end_time: availability.end_time,
        care_coordinator_id: availability.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
    }
  }

  addCareCoordinatorRole(role) {
    if(role.roleId != null) {
      return axios.put(API_URL + 'carecoordinator/'+role.care_coordinator_id+'/access/'+role.roleId, {
        role: role.role,
        care_coordinator_id: role.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
    }
    else {
      return axios.post(API_URL + 'carecoordinator/'+role.care_coordinator_id+'/access', {
        role: role.role,
        care_coordinator_id: role.care_coordinator_id,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
    }
  }

  addCareCoordinatorDocument(document) {
    return axios.post(API_URL + 'carecoordinator/'+document.care_coordinator_id+'/document', {
        name: document.name,
        file_path: document.file_path,
        type_id: document.type_id,
        tags: document.tags,
      },
      { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  uploadFile(file) {
    console.log('File 2', file)
    // console.log('File Name', file.name)
    let user = JSON.parse(localStorage.getItem('user'));
    return axios.post('https://ditstekdemo.com/Virtare-web/public/api/fileupload', {file: file}, {headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer '+user.token} })
    .then(function() {
        console.log('SUCCESS!!');
      })
      .catch(function(error) {
        console.log('FAILURE!!', error);
      });
  }

  getCareCoordinatorsList(id) {
    return axios.get(API_URL + 'carecoordinator/list', { headers: authHeader() });
  }

  getCoordinatorDetails(id) {
    return axios.get(API_URL + 'carecoordinator/list/'+id, { headers: authHeader() });
  }

  deleteCoordinator(id) {
    return axios.delete(API_URL + 'coordinator/'+id, { headers: authHeader() });
  }

  getCoordinatorContacts(id) {
    return axios.get(API_URL + 'carecoordinator/'+id+'/contact', { headers: authHeader() });
  }

  deleteCoordinatorContact(data) {
    return axios.delete(API_URL + 'coordinator/'+data.coordinatorId+'/contact/'+data.contactId, { headers: authHeader() });
  }

  deleteCoordinatorAvailability(data) {
    return axios.delete(API_URL + 'coordinator/'+data.coordinatorId+'/availability/'+data.availabilityId, { headers: authHeader() });
  }

  deleteCoordinatorRole(data) {
    return axios.delete(API_URL + 'coordinator/'+data.coordinatorId+'/role/'+data.roleId, { headers: authHeader() });
  }

  getCoordinatorContactDetails(data) {
    return axios.get(API_URL + 'carecoordinator/'+data.carecoordinatorId+'/contact/'+data.contactId, { headers: authHeader() });
  }

  getCoordinatorAvailabilities(id) {
    return axios.get(API_URL + 'carecoordinator/'+id+'/availability', { headers: authHeader() });
  }

  getCoordinatorAvailabilityDetails(data) {
    return axios.get(API_URL + 'carecoordinator/'+data.carecoordinatorId+'/availability/'+data.availabilityId, { headers: authHeader() });
  }

  getCoordinatorRoles(id) {
    return axios.get(API_URL + 'carecoordinator/'+id+'/access', { headers: authHeader() });
  }
  getCoordinatorRoleDetails(data) {
    return axios.get(API_URL + 'carecoordinator/'+data.carecoordinatorId+'/access/'+data.roleId, { headers: authHeader() });
  }
  
  getSpecializationsCount(id) {
    return axios.get(API_URL + 'specialization/'+id, { headers: authHeader() });
  }

  getNetworkCount(id) {
    return axios.get(API_URL + 'network/'+id, { headers: authHeader() });
  }

}

export default new CareCoordinatorService();

