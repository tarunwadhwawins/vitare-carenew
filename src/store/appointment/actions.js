import serviceMethod from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { successSwal, errorSwal } from '../../commonMethods/commonMethod'

export const addAppointment = async ({
  commit
}, data) => {
  await serviceMethod.common("post", API_ENDPOINTS['addAppointment'], null, data).then((response) => {
    successSwal(response.data.message)
    commit('successMsg', response.data.message);
  }).catch((error) => {
    if(error.response.status === 422){
      commit('errorMsg', error.response.data)
    }else if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }else if(error.response.status === 401){
      errorSwal(error.response.data.message)
    }
  })
}
export const searchAppointment = async ({
  commit
},from) => {
  //console.log(to)
  await serviceMethod.common("get", API_ENDPOINTS['seacrhAppointment']+from, null, null).then((response) => {
    commit('searchAppointmentSuccess', response.data.data);
  }).catch((error) => {
    if(error.response.status === 422){
      commit('errorMsg', error.response.data)
    }else if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }else if(error.response.status === 401){
      errorSwal(error.response.data.message)
    }
  })
}


