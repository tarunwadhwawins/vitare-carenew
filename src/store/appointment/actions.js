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
  commit('loadingStatus', true)
  //console.log(to)
  await serviceMethod.common("get", API_ENDPOINTS['seacrhAppointment']+"?fromDate=" + from.fromDate + "&toDate=" + from.toDate, null, null).then((response) => {
    commit('searchAppointmentSuccess', {data:response.data.data,key:from.tabId});
    commit('loadingStatus', false)
  }).catch((error) => {
    if(error.response.status === 422){
      commit('loadingStatus', true)
      commit('errorMsg', error.response.data)
    }else if(error.response.status === 500){
      commit('loadingStatus', false)
      errorSwal(error.response.data.message)
    }else if(error.response.status === 401){
      commit('loadingStatus', false)
      errorSwal(error.response.data.message)
    }
  })
}
export const weekName =({commit},date) =>{
  commit('GetWeekName', date)
}
export const calendarDateSelect =({commit},date) =>{
  commit('calendarDateSelect', date)
}


