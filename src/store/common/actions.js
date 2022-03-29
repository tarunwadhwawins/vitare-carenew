import serviceMethod from '@/services/serviceMethod';
import {API_ENDPOINTS} from "@/config/apiConfig"
import { errorSwal } from '@/commonMethods/commonMethod'


export const globalCodes = async ({commit}) => {
  await serviceMethod.common("get", "globalCodeCategory?all=all", null, null).then((response) => {
    commit('globalCodes', response.data.data);
  }).catch((error) => {
    if (error.response.status == 401) {
      //AuthService.logout();
    }
    commit('failure', error.response.data);
  })
}

export const vitalFieldsList = async ({ commit }, deviceId) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['field'], deviceId, null).then((response) => {
    commit('vitalFieldsList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const vitalFieldsByDeviceId = async ({ commit }, deviceId) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['field'], deviceId, null).then((response) => {
    commit('vitalFieldsByDeviceId', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const allPatientsList = async ({ commit }) => {
  //commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['patient'] + '?all=all', null, null).then((response) => {
    commit('allPatientsList', response.data.data);
    //commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const allStaffList = async ({ commit }) => {
  //commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['staffList'] + '?all=all', null, null).then((response) => {
    commit('allStaffList', response.data.data);
    //commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const activeCptCodes = async ({ commit }) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['cptCodes'], null, null).then((response) => {
    commit('activeCptCodes', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

// export const getNotifications = async ({ commit}) => {
//   await serviceMethod.common("get", API_ENDPOINTS['notification'], null, null).then((response) => {
//     commit('getNotifications', response.data.data);
//     commit('loadingStatus', false)
//   }).catch(() => {
//     commit('loadingStatus', false)
//   })
// }

export const notificationList = async ({ commit }) => {
  await serviceMethod.common("get", `notification/isReadList`, null, null).then((response) => {
    commit('getNotifications', response.data.data);
    commit('notificationList', response.data.data.length);
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}


export const isReadUpdateNotification = async ({
  commit
}, id) => {

  await serviceMethod.common("put", `notification/isRead/${id}`, null, true).then((response) => {
    commit('isReadUpdateNotification', response.data.data);
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg', error.response.data.message)
    }
  })
}

export const searchTable = async ({ commit }, search) => {
  commit("searchTable", search)
}
export const searchTableData = async ({ commit }, search) => {

  commit('loadingStatus', true)
  await serviceMethod.common("get", search.endPoint + '?active=1&search=' + search.data, null, null).then((response) => {
    commit(search.endPoint, response.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('errorMsg', error);
    if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}


export const actionTrack = async ({ commit }, data) => {
  await serviceMethod.common("post", `${data.endPoint}/${data.id}/action`, null, { actionId: data.actionId }).then((response) => {
    commit('actionTrack', response.data.data);
    // successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    } else if (error.response.status === 409) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })
}

const API_URL = process.env.VUE_APP_API_URL
export const exportReportRequest = async ({ commit }, data) => {
 let response = await serviceMethod.common("post", `export/report/request`, null, { reportType: data.data })
  commit('exportReportRequest', response.data.data);
  let udid = response.data.data.udid;
  let reportType = response.data.data.reportType;
  let type = reportType.replace('_','/');
  await  window.open(API_URL+`${type}/export/${udid}`, '_blank')
}