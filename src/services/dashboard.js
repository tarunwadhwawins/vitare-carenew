import axios from 'axios';
import authHeader from './authHeader';


const API_URL = process.env.VUE_APP_API_URL

class DashboardService {
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