import axios from 'axios';
import router from "@/router"

const API_URL = process.env.VUE_APP_API_URL


class AuthService {
  login(user) {
    return axios.post(API_URL + 'login', {
        email: user.email,
        password: user.password,
        role: "Admin"
      })
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    localStorage.removeItem('roleAndPermission');
    router.push("/")
   
  }
}

export default new AuthService();