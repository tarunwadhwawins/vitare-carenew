import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL

class AuthService {
  login(user) {
    return axios.post(API_URL + 'login', {
      email: user.email,
      password: user.password,
      role: "Staff"
    })
  }
}

export default new AuthService();