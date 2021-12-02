import axios from 'axios';

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
        console.log(JSON.stringify(res.data.token));
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data.token;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();