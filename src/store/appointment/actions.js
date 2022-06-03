import serviceMethod from '@/services/serviceMethod'
import { API_ENDPOINTS } from "@/config/apiConfig"
import { 
  successSwal,
  messageSwal,
   startimeAdd, 
   endTimeAdd, 
   timeStamp,
   errorLogWithDeviceInfo
   } from '@/commonMethods/commonMethod'

export const addAppointment = async ({
  commit
}, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("post", API_ENDPOINTS['addAppointment'], null, data).then((response) => {
    successSwal(response.data.message)
    commit('successMsg', response.data.message);
    commit('loadingStatus', false)
  }).catch((error) => {
    if (error.response) {
      //messageSwal(error.response.data.message)
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    if(error.response.status === 422){
      commit('errorMsg', error.response.data)
    }else if(error.response.status === 500){
       //messageSwal(error.response.data.message)
    }else if(error.response.status === 401){
      messageSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
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
    }
    commit('loadingStatus', false)
  }).catch((error) => {
      if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
      commit('loadingStatus', false)
      // errorSwal(error.response.data.message)
    
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
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
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
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		commit('failure', error.response.data);
	})
}

///staff
export const getStaffs = async ({commit},data) => {
  let staff= []
  
staff = JSON.parse(localStorage.getItem("staff")) || []
//console.log("staff1",JSON.parse(localStorage.getItem("staff")))
if(data){
  
    staff.push({
      "id":data.id,
      "firstName":data.firstName,
      "profile_photo":data.profile_photo,
      "fullName":data.fullName
    })

  
}

localStorage.setItem('staff', JSON.stringify(staff));
 commit('getStaffs', staff);
}



export const appointmentDetails = async ({commit},id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `appointment/detail/${id}`, null, null).then((response) => { 
    commit('appointmentDetails', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
      if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
      commit('loadingStatus', false)
      // errorSwal(error.response.data.message)
    
  })
}


export const appintmentStatus = async ({commit},data) => {
  commit('loadingStatus', true)
  let result =null
  await serviceMethod.common("put", `appointment/status/${data.id}?statusId=${data.statusId}`, null, {cancellationNote:data.cancellationNote}).then((response) => { 
    commit('appintmentStatus', response.data.data);
    commit('loadingStatus', false)
    result = response
  }).catch((error) => {
      if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
      commit('loadingStatus', false)
      // errorSwal(error.response.data.message)
    
  })

  return result
}

export const patientAppointmentsList = async ({commit}, patientUdid) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['patient']+`/${patientUdid}/appointment?all=all`, null, null).then((response) => { 
    commit('patientAppointmentsList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    commit('loadingStatus', false)
  })
}


export const requestCall = async ({commit}) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `requestCall`, null, null).then((response) => { 
    commit('requestCall', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    commit('loadingStatus', false)
  })
}

