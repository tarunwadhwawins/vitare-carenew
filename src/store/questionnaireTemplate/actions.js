import serviceMethod from '@/services/serviceMethod'
import { API_ENDPOINTS } from "@/config/apiConfig"
import {  successSwal,errorLogWithDeviceInfo } from '@/commonMethods/commonMethod'

export const questionnaireTemplateList = async ({
  commit
},page) => {
  let link = page ?API_ENDPOINTS['questionnaireTemplate']+page : API_ENDPOINTS['questionnaireTemplate']
  commit('loadingStatus', true)
  await serviceMethod.common("get", link, null, null).then((response) => {

    commit('questionnaire', response.data)
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 401) {
      commit('errorMsg', error.response.data)
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
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    
    
  })
}
export const detailsQuestionnaireTemplate = async ({
  commit
},id) => {
  commit('loadingTableStatus', true)
 
  await serviceMethod.common("get", API_ENDPOINTS['questionnaireTemplate'], id, null).then((response) => {

    commit('detailsQuestionnaireTemplate', response.data.data);
    
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
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
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
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
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 401) {
      commit('errorMsg', error.response.data)
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
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    commit('loadingTableStatus', false)
    
    
  })
}
export const addAssiignquestionnaire = async ({
  commit
},data) => {
 
  let url = data.temOrSection =='section' ? 'questions/'+data.id+'/assign' : API_ENDPOINTS['questionnaireTemplate']+'/'+data.id+'/question'
  await serviceMethod.common(data.method, url, null, data.data).then((response) => {
 if(data.showPopup){
    successSwal(response.data.message)
  }
    commit('successMsg',response.data.message)
    
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    
    
    
  })
}
export const addAssiignquestionnaireResponse = async ({
  commit
},data) => {
  await serviceMethod.common("post", API_ENDPOINTS['questionnaireTemplate']+'/'+data.id+'/client', null, data.data).then((response) => {

    successSwal(response.data.message)
    commit('successMsg',response.data.message)
    
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    
    
    
  })
}
export const scoreCount = async ({
  commit
},id) => {
  await serviceMethod.common("get", 'questionnaire/response/score/'+id, null, null).then((response) => {

    
    commit('scoreCount',response.data.data)
    
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    
    
    
  })
}



//questionnaire section assign to template.
export const sectionAssignToTemplate = async ({
  commit
},data) => {
  
  await serviceMethod.common(data.method, 'questionnaireSection/'+data.id+'/assign', null, data).then((response) => {
  if(data.showPopup){
    successSwal(response.data.message)
  }
    
    commit('successMsg',response.data.message)
    
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    
    
    
  })
}

//questionnaire Form Response
export const questionnaireResponse = async ({
  commit
},page) => {
  let link = page ? 'user/questionnaire/template'+page+'&entityType=247' : 'user/questionnaire/template?rentityType=247'
  commit('loadingStatus', true)
  await serviceMethod.common('get', link, null, null).then((response) => {
  
    commit('questionnaireResponse',response.data)
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    commit('loadingStatus', false)
    
    
  })
}
export const questionnaireResponseDetails = async ({
  commit
},id) => {
  
  commit('loadingStatus', true)
  await serviceMethod.common('get', 'user/questionnaire/template', id, null).then((response) => {
  
    commit('questionnaireResponseDetails',response.data)
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    commit('loadingStatus', false)
    
    
  })
}

export const assignToUser = async ({
  commit
},data) => {
  
  commit('loadingStatus', true)
  await serviceMethod.common('post', 'assign/questionnaire/template', null, data).then((response) => {
  
    successSwal(response.data.message)
    commit('successMsg',response.data.message)
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    commit('loadingStatus', false)
    
    
  })
}

export const assignAllTemplates = async ({
  commit
},data) => {
  
  commit('loadingStatus', true)
  await serviceMethod.common('get', 'assign/questionnaire/template?referenceId='+data.id+'&entityType='+data.entityType, null, null).then((response) => {
  
    commit('assignAllTemplates',response.data)
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      commit('errorMsg',error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg',error.response.data.message)
    }
    commit('loadingStatus', false)
    
    
  })
}

