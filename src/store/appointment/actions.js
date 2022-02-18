import serviceMethod from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { successSwal, errorSwal, startimeAdd, endTimeAdd, timeStamp } from '../../commonMethods/commonMethod'

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
  await serviceMethod.common("get", API_ENDPOINTS['seacrhAppointment']+"?fromDate=" + timeStamp(startimeAdd(from.fromDate)) + "&toDate=" + timeStamp(endTimeAdd(from.toDate)), null, null).then((response) => {
    
    if(from.tabId==5){
      commit('todayAppointmentSuccess', response.data.data) 
    }else{
    commit('searchAppointmentSuccess', {data:response.data.data,key:from.tabId});
    commit('loadingStatus', false)
    }
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


export const latestAppointment = async ({ commit }, id) => {
	await serviceMethod.common("get", API_ENDPOINTS['appointment']+'?latest=latest&id='+id, null, null).then((response) => {
		commit('latestAppointmentSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

