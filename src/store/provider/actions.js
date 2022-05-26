import serviceMethod from '@/services/serviceMethod'
import { API_ENDPOINTS } from "@/config/apiConfig"
import { successSwal, errorLogWithDeviceInfo } from '@/commonMethods/commonMethod'

export const provider = async ({
  commit
}, data) => {
  await serviceMethod.common("post", API_ENDPOINTS['provider'], null, data).then((response) => {
    commit('providerData', response.data.data);
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
  })
}

export const providerLocation = async ({commit}, data) => {
  let status = false
  commit('loadingStatus', true)
  await serviceMethod.common("post", `provider/${data.id}/location`, null, data.data).then((response) => {
    successSwal(response.data.message)
    commit('providerLocation', response.data.data);
    status = true
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
  return status
}


export const editProviderLocation = async ({commit}, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `provider/${data.id}/location/${data.locationId}`, null, null).then((response) => {
    commit('editProviderLocation', response.data.data);
    commit("checkChangeInput", true)
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


export const updateProviderLocation = async ({commit}, data) => {
    let status = false
  commit('loadingStatus', true)
  await serviceMethod.common("put", `provider/${data.id}/location/${data.locationId}`, null, data.data).then((response) => {
    successSwal(response.data.message)
    commit('updateProviderLocation', response.data.data);
    commit("checkChangeInput", false)
    status=true
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
  return status
}

export const providersListAll = async ({
  commit
},page) => {
  commit('loadingStatus', true)
  let link = page? "provider?active=1"+page : "provider?active=1"
  await serviceMethod.common("get", link, null, null).then((response) => {
    commit('provider', response.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    commit('loadingStatus', false)
    // errorSwal(error.response.data.message)
  })
}

export const editSingleProvider = async ({ commit }, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `provider/${id}`, null, null).then((response) => {
    commit('editSingleProvider', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
}
export const providerLocationList = async ({
  commit
}, id) => {
  await serviceMethod.common("get", `provider/${id}/location`, null, null).then((response) => {
    commit('providerLocationList', response.data.data);
   commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    // errorSwal(error.response.data.message)
    
  })
}

export const deleteSingleProvider = async ({ commit }, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("delete", `provider/${data.id}`, null, null).then((response) => {
    successSwal(response.data.message)
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    // errorSwal(error.response.data.message)
  })
}

export const deleteProviderLocation = async ({ commit }, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("delete", `provider/${data.id}/location/${data.locationId}`, null, null).then((response) => {
    successSwal(response.data.message)
   
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    // errorSwal(error.response.data.message)
    commit('loadingStatus', false)
  })

}

export const updateSingleProvider = async ({ commit }, data) => {
  
  await serviceMethod.common("put",`provider`,data.id,data.data).then((response)=>{
    commit('updateSingleProvider', response.data.data);
    if(data.data.showPopup){
      successSwal(response.data.message)
    }
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
  })
}

