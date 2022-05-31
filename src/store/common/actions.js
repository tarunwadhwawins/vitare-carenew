import serviceMethod from '@/services/serviceMethod';
import {API_ENDPOINTS} from "@/config/apiConfig"
import { 
  errorSwal,
  errorLogWithDeviceInfo,
  successSwal
} from '@/commonMethods/commonMethod'


export const globalCodes = async ({commit}) => {
  await serviceMethod.common("get", "globalCodeCategory?all=all", null, null).then((response) => {
    commit('globalCodes', response.data.data);
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
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
    errorLogWithDeviceInfo(error.response)
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
    errorLogWithDeviceInfo(error.response)
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
    errorLogWithDeviceInfo(error.response)
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
    errorLogWithDeviceInfo(error.response)
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
    errorLogWithDeviceInfo(error.response)
    commit('failure', error);
    commit('loadingStatus', false)
  })
}

export const getNotifications = async ({ commit}) => {
  await serviceMethod.common("get", API_ENDPOINTS['notification'], null, null).then((response) => {
    commit('getNotifications', response.data.data);
    commit('loadingStatus', false)
  }).catch(() => {
    commit('loadingStatus', false)
  })
}

export const notificationList = async ({ commit }) => {
  await serviceMethod.common("get", `notification/isReadList`, null, null).then((response) => {
    commit('getNotificationsList', response.data.data);
    commit('notificationList', response.data.data.length);
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    // errorSwal(error.response.data.message)
  })
}


export const isReadUpdateNotification = async ({
  commit
}, id) => {

  await serviceMethod.common("put", `notification/isRead/${id}`, null, true).then((response) => {
    // commit('isReadUpdateNotification', response.data.data);
    console.log(response);
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg', error.response.data.message)
    }
  })
}

export const searchTable = async ({ commit }, search) => {
  commit("searchTable", search ? search :'')
}
export const orderTable = async ({ commit},data) => {
  commit("orderTable",data)
}

  
export const searchTableData = async ({ commit }, search) => {

  commit('loadingStatus', true)
  commit('loadingTableStatus', true)
  await serviceMethod.common("get", search.endPoint + '?active=1&search=' + search.data+search.field+search.filter, null, null,true).then((response) => {
    commit(search.endPoint, response.data);
    commit('loadingStatus', false)
    commit('loadingTableStatus', false)
  }).catch((error) => {
    if(!error.__CANCEL__){

      errorLogWithDeviceInfo(error.response)
      commit('errorMsg', error);
      if (error.response.status === 500) {
        // errorSwal(error.response.data.message)
      }
      commit('loadingStatus', false)
      commit('loadingTableStatus', false)
    }
    
  })
}


export const actionTrack = async ({ commit }, data) => {
  await serviceMethod.common("post", `${data.endPoint}/${data.id}/action`, null, { actionId: data.actionId }).then((response) => {
    commit('actionTrack', response.data.data);
    // successSwal(response.data.message)
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 409) {
      // commit('errorMsg', error.response.data.message)
      // errorSwal(error.response.data.message)
    }
  })
}

const API_URL = process.env.VUE_APP_API_URL
export const exportReportRequest = async ({ commit }, data) => {

 let response = await serviceMethod.common("post", `export/report/request`+ data.field, null, { reportType: data.data ,timezone:data.timezone})
  console.log(commit)
  let udid = response.data.data.udid;
  let reportType = response.data.data.reportType;
  let type = reportType.replace('_','/');
  console.log("check",API_URL+`${type}/export/${udid}`+data.field)
  await  window.open(API_URL+`${type}/export/${udid}`+data.field, '_blank')
}



export const passwordReset = async ({commit}, data) => {
  let status = false
  await serviceMethod.common("put", `${data.endPoint}/${data.id}/resetPassword`, null, true).then((response) => {
    // commit('isReadUpdateNotification', response.data.data);
    successSwal(response.data.message)
    console.log(response);
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      // commit('errorMsg', error.response.data)
      errorSwal(error.response.data.password[0])
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg', error.response.data.message)
    }
  })
  return status
}
