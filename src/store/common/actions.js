import ServiceMethodService from '../../services/serviceMethod';
import {
  API_ENDPOINTS
} from "../../config/apiConfig"

export const globalCodes = async ({
  commit
}) => {
  await ServiceMethodService.common("get", "globalCodeCategory", null, null).then((response) => {

    commit('globalCodes', response.data.data);

  }).catch((error) => {
    if (error.response.status == 401) {
      //AuthService.logout();
    }
    commit('failure', error.response.data);
  })
}


// export const staffList = async ({
//   commit
// }) => {
//   await ServiceMethodService.common("get", API_ENDPOINTS['staffList'], null, null).then((response) => {
//     commit('staffListSuccess', response.data.data);
//   })
//     .catch((error) => {
//       if (error.response.status == 401) {
//         //AuthService.logout();
//       }
//       commit('failure', error.response.data);
//     })
// }

export const vitalFieldsList = async ({ commit },deviceId) => {
  commit('loadingStatus', true)
  await ServiceMethodService.common("get", API_ENDPOINTS['field'], deviceId, null).then((response) => {
    commit('vitalFieldsList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const vitalFieldsByDeviceId = async ({ commit},deviceId) => {
  commit('loadingStatus', true)
  await ServiceMethodService.common("get", API_ENDPOINTS['field'], deviceId, null).then((response) => {
    commit('vitalFieldsByDeviceId', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const allPatientsList = async ({ commit}) => {
  //commit('loadingStatus', true)
  await ServiceMethodService.common("get", API_ENDPOINTS['patient']+'?all=all', null, null).then((response) => {
    commit('allPatientsList', response.data.data);
    //commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const allStaffList = async ({ commit}) => {
  //commit('loadingStatus', true)
  await ServiceMethodService.common("get", API_ENDPOINTS['staffList']+'?all=all', null, null).then((response) => {
    commit('allStaffList', response.data.data);
    //commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const activeCptCodes = async ({ commit}) => {
  commit('loadingStatus', true)
  await ServiceMethodService.common("get", API_ENDPOINTS['cptCodes'], null, null).then((response) => {
    commit('activeCptCodes', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}




export const getNotifications = async ({ commit}) => {
  await ServiceMethodService.common("get", API_ENDPOINTS['notification'], null, null).then((response) => {
    commit('getNotifications', response.data.data);
    commit('loadingStatus', false)
  }).catch(() => {
    commit('loadingStatus', false)
  })
}