import axios from 'axios';
import store from '@/store/index.js';

// const API_URL = 'http://ditstekdemo.com/Virtare/public/api/';
const API_URL = 'https://ditstekdemo.com/Virtare-web/public/api/';

class AuthService {
  login(user) {

    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password,
        role: user.role
      })
      .then(response => {
        const res = response.data
        if (res.data.token) {
          var userData = {
            'token': res.data.token,
            'email': res.data.user.email,
            'email_verify': res.data.user.email_verify,
            'role_id': res.data.user.role_id,
            'uuid': res.data.user.uuid,
          }
          store.state.user = userData;
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem("auth", "true");
        }
        return userData;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    location.reload();
  }
}

export default new AuthService();