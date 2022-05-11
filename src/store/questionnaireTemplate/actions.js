import serviceMethod from '@/services/serviceMethod'
import { API_ENDPOINTS } from "@/config/apiConfig"
import { errorSwal, successSwal,errorLogWithDeviceInfo } from '@/commonMethods/commonMethod'

export const questionnaireTemplateList = async ({
  commit
},page) => {
  let link = page ?API_ENDPOINTS['questionnaireTemplate']+page : API_ENDPOINTS['questionnaireTemplate']
  commit('loadingStatus', true)
  await serviceMethod.common("get", link, null, null).then((response) => {

    commit('questionnaire', response.data)
    //commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}
export const addQuestionnaireTemplate = async ({
  commit
},data) => {
  await serviceMethod.common("post", API_ENDPOINTS['questionnaireTemplate'], null, data).then((response) => {
    commit('addQuestionnaireTemplate', response.data.data);
    successSwal(response.data.message)
    commit('successMsg',response.data.message)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
    
    
  })
}
export const detailsQuestionnaireTemplate = async ({
  commit
},id) => {
  commit('loadingTableStatus', true)
 
  await serviceMethod.common("get", API_ENDPOINTS['questionnaireTemplate'], id, null).then((response) => {

    commit('detailsQuestionnaireTemplate', response.data.data);
    commit('loadingTableStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
    commit('loadingTableStatus', false)
    
    
  })
}
 
export const updateQuestionnaireTemplate = async ({
  commit
},data) => {
  await serviceMethod.common("put", API_ENDPOINTS['questionnaireTemplate'], data.id, data.data).then((response) => {
    successSwal(response.data.message)
    commit('successMsg',response.data.message)
   
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
    
    
    
  })


}
export const deleteQuestionnaireTemplate = async ({
  commit
},id) => {

  await serviceMethod.common("delete", API_ENDPOINTS['questionnaireTemplate'], id, null).then((response) => {
    successSwal(response.data.message)
    commit('successMsg',response.data.message)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  
    
    
  })


}
export const templateDetailsList = async ({
  commit
},id) => {
  commit('loadingTableStatus', true)
 
  await serviceMethod.common("get", API_ENDPOINTS['questionnaireTemplate']+'/'+id+'/question', null, null).then((response) => {

    commit('templateDetailsList', response.data.data);
    commit('loadingTableStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
    commit('loadingTableStatus', false)
    
    
  })
}
export const addAssiignquestionnaire = async ({
  commit
},data) => {
 
 
  await serviceMethod.common("post", API_ENDPOINTS['questionnaireTemplate']+'/'+data.id+'/question', null, data).then((response) => {

    successSwal(response.data.message)
    commit('successMsg',response.data.message)
    
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
    
    
    
  })
}
export const addAssiignquestionnaireResponse = async ({
  commit
},data) => {
 
 
  await serviceMethod.common("post", API_ENDPOINTS['addAssiignquestionnaireResponse']+'/'+data.id+'/question', null, data).then((response) => {

    successSwal(response.data.message)
    commit('successMsg',response.data.message)
    
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
    
    
    
  })
}



