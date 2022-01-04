import axios from 'axios';
import store from '@/store/index.js';
import router from "@/router"

const API_URL2 = 'https://ditstekdemo.com/Virtare-web/public/api/';
const API_URL = 'http://92.204.135.120:8081/api/';

class AuthService {
 async  login(user) {
    let res2 = null;
   let res=null;
   console.log('user',user)
   await axios
      .post(API_URL + 'Auth/Login', {
        emailId: user.email,
        password: user.password,
        // role: user.role
        businessId:1,
        applicationId:58,
        rememberMe:true,
        isEmployee:user.checked
      })
      .then(response => {
       
        //console.log(res)
        
        res = response.data;
      });
       await axios.post(API_URL2 + 'login', {
        email: "admin@admin.com",
        password: "password",
        role: "Admin"
       
      })
      .then(response => {
        //console.log("res",res.data)
        res2 = response.data;
      });

      var obj = JSON.parse(res.roleAndPermission);
      var userData = {
        'token': res2.data.token,
        'email': res.emailId,
        'email_verify': res2.data.user.email_verify,
        'role_id': res2.data.user.role_id,
        'roleAndPermission': Object.keys(obj).map(function (key) { return obj[key]; }),
        'login':res.login
      }

      // var json = res.roleAndPermission;
      // var obj1 = JSON.parse(json);
      // var values = Object.keys(obj1).map(function (key) { return obj1[key]; });
      // var temp = values.map((key)=> {
      //   let json = JSON.parse(key.permissions)
      //   return Object.values(json);
      //  })
      // console.log("roles",temp)

      // console.log('user',JSON.stringify(userData))

      store.state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem("auth",res.login);
      localStorage.setItem('roleAndPermission', JSON.stringify(res2.roleAndPermission));
      return userData;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    localStorage.removeItem('roleAndPermission');
    router.push("/")
    // location.reload();
  }
}

export default new AuthService();