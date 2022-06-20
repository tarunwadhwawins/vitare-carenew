import ServiceMethodService from '@/services/serviceMethod';
import {
  API_ENDPOINTS,
} from '@/config/apiConfig';
import {
  messages
} from '@/config/messages';
import {
  errorSwal,
  errorLogWithDeviceInfo,
  successSwal
} from '@/commonMethods/commonMethod';
import router from '@/router';

let date = new Date();
export const login = async ({
  commit
}, user) => {
  await ServiceMethodService.login(user)
    .then((response) => {
      localStorage.setItem('user', response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('auth', JSON.stringify(response.data));
      localStorage.setItem('checkLogin', true);
      localStorage.setItem(
        'expiresIn',
        date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
      );
      // setInterval for refresh token api
      setInterval(async () => {
        await ServiceMethodService.common('post', API_ENDPOINTS['refreshToken'], null, true)
          .then((response) => {
            commit('refreshTokenSuccess', response.data);
            localStorage.setItem('token', response.data.token);
            commit('expiresIn', date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10)));
            localStorage.setItem(
              'expiresIn',
              date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
            );
          })
          .catch((error) => {
            errorLogWithDeviceInfo(error.response);
          });
      }, (response.data.expiresIn / 100 - 10) * 1000);
      // end setInterval
      commit('loginSuccess', response.data);
      roleAccess({
        commit
      });
    })
    .catch((error) => {
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
      if (error.response.status == 401) {
        commit('loginFailure', 'Invalid Login Credentials');
        commit('failure', 'Invalid Login Credentials');
      } else {
        commit('loginFailure', error);
      }
    });
};
const roleAccess = async ({
  commit
}) => {
  await ServiceMethodService.common('get', 'staff/access', null, null)
    .then((response) => {
      commit('accessPermission', response.data.data.length);
      localStorage.setItem('accessPermission', response.data.data.length);
      localStorage.setItem('access', true);
      localStorage.setItem('roleAuth', response.data.data[0] ? response.data.data[0].roleId : '');
      permission({
        commit
      });
    })
    .catch((error) => {
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
      errorSwal(error.response.data.message);
    });
};
const permission = async ({
  commit
}) => {
  await ServiceMethodService.common('get', 'staff/access/action', null, null)
    .then((response) => {
      if (response.data.actionId.length == 0 && response.data.widgetId.length == 0) {
        errorSwal(messages.permissionsError).then((response) => {
          commit('failure', 'true');
          if (response == true) {
            logoutUser({
              commit
            });
          } else {
            logoutUser({
              commit
            });
          }
        });
      } else {
        localStorage.setItem('screensPermission', JSON.stringify(response.data.actionId));
        localStorage.setItem('widgetsPermission', JSON.stringify(response.data.widgetId));
        localStorage.setItem('permission', JSON.stringify(response.data));
        commit('permissions', response.data);
        router.push(router.currentRoute.value.query.redirect || '/dashboard');
      }
    })
    .catch((error) => {
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
    });
};
export const logoutUser = async ({
  commit
}) => {
  commit('loadingTableStatus', true)
  await ServiceMethodService.common('post', 'logout', null, [])
    .then(() => {
      console.log(commit)
      //if(response){
      successSwal('Logout Successfully ');
      localStorage.removeItem('user');
      localStorage.removeItem('barmenu');
      localStorage.removeItem('staff');
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      localStorage.removeItem('roleAuth');
      localStorage.removeItem('access');
      localStorage.removeItem('accessPermission');
      localStorage.removeItem('permission');
      localStorage.removeItem('screensPermission');
      localStorage.removeItem('widgetsPermission');
      localStorage.removeItem('fireBaseToken');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('checkLogin');
      //router.push('/');
      setTimeout(() => {
        router.go();
      }, 1000);
      commit('loadingTableStatus', false)
      //}
    })
    .catch((error) => {
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
      errorSwal(error.response.data.message);
      commit('loadingTableStatus', false)
    });
};

export const refreshToken = async ({
  commit
}) => {
  await ServiceMethodService.common('post', API_ENDPOINTS['refreshToken'], null, true)
    .then((response) => {
      commit('refreshTokenSuccess', response.data);
      localStorage.setItem('token', response.data.token);
      commit('expiresIn', date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10)));
      localStorage.setItem(
        'expiresIn',
        date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
      );
      // setInterval for refresh token api
      setInterval(async () => {
        await ServiceMethodService.common('post', API_ENDPOINTS['refreshToken'], null, true)
          .then((response) => {
            commit('refreshTokenSuccess', response.data);
            localStorage.setItem('token', response.data.token);
            commit('expiresIn', date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10)));
            localStorage.setItem(
              'expiresIn',
              date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
            );
          })
          .catch((error) => {
            if (error.response) {
              errorLogWithDeviceInfo(error.response);
            } else {
              errorLogWithDeviceInfo(error);
            }
          });
      }, (response.data.expiresIn / 100 - 10) * 1000);
      // end setInterval
    })
    .catch((error) => {
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
      if (error.response.status == 401) {
        //AuthService.logout();
      }
      commit('failure', error.response.data);
    });
};
