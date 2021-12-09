import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://ditstekdemo.com/Virtare/public/api/';
const API_URL = 'https://ditstekdemo.com/Virtare-web/public/api/';

class DashboardService {
    totalPatient() {
        return axios.get(API_URL + 'total-patients', { headers: authHeader() });
      }
      newPatient() {
        return axios.get(API_URL + 'new-patients', { headers: authHeader() });
      }
      abnormalPatient() {
        return axios.get(API_URL + 'abnormal-patients', { headers: authHeader() });
      }
      activePatient() {
        return axios.get(API_URL + 'active-patients', { headers: authHeader() });
      }
      inactivePatient() {
        return axios.get(API_URL + 'inactive-patients', { headers: authHeader() });
      }
      criticalPatient() {
        return axios.get(API_URL + 'critical-patients', { headers: authHeader() });
      }
      appointment(id) {
        return axios.get(API_URL + 'appointment/status/'+id, { headers: authHeader() });
      }
      todayappointment() {
        return axios.get(API_URL + 'today-appointment', { headers: authHeader() });
      }
      appointmentcount() {
        return axios.get(API_URL + 'appointment-count', { headers: authHeader() });
      }
      specialization(id) {
        return axios.get(API_URL + 'specialization/'+id, { headers: authHeader() });
      }
      network(id) {
        return axios.get(API_URL + 'network/'+id, { headers: authHeader() });
      }
}

export default new DashboardService(); 