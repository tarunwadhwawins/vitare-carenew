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
  await serviceMethod.common("get", API_ENDPOINTS['seacrhAppointment']+"?fromDate=" + timeStamp(startimeAdd(from.fromDate)) + "&toDate=" + timeStamp(endTimeAdd(from.toDate))+"&staffId="+from.physiciansId, null, null).then((response) => {
    
    if(from.tabId=='today'){
      commit('todayAppointmentSuccess', response.data.data) 
    }else{
    commit('searchAppointmentSuccess', {data:response.data.data,key:from.tabId});
    commit('loadingStatus', false)
    }
  }).catch((error) => {
    
      commit('loadingStatus', false)
      errorSwal(error.response.data.message)
    
  })
}
export const weekName =({commit},date) =>{
  commit('GetWeekName', date)
}
export const calendarDateSelect =({commit},date) =>{
  commit('calendarDateSelect', date)
}
export const showMoreRecords =({commit},data) =>{
  commit('showMoreRecords', data)
}


export const latestAppointment = async ({ commit }, id) => {
	await serviceMethod.common("get", API_ENDPOINTS['appointment']+'/'+id, null, null).then((response) => {
    if(response.data.data.length > 0) {
      commit('latestAppointmentSuccess', response.data.data);
    }
    else {
      commit('latestAppointmentSuccess', null)
    }
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}



export const appointmentConference = async ({ commit }) => {
	await serviceMethod.common("get", API_ENDPOINTS['appointmentConference'], null, null).then((response) => {
		commit('appointmentConference', response.data.data);
	})
	.catch((error) => {
		commit('failure', error.response.data);
	})
}

///staff
export const getStaffs = async ({commit}) => {
 
  await serviceMethod.common("get", `staff`, null, null).then((response) => {
    commit('getStaffs', response.data.data);
   
  }).catch((error) => { 
    
      errorSwal(error.response.data.message)
      
    
  })
}



