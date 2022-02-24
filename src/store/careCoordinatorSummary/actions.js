import serviceMethod from '../../services/serviceMethod'
import { errorSwal } from '../../commonMethods/commonMethod'


export const staffSummary = async ({commit}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}`, null, null).then((response) => {
    commit('staffSummary', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}



export const staffSummaryAppointment = async ({commit}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/appointment`, null, null).then((response) => {
    commit('staffSummaryAppointment', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}


export const staffSummaryPatient = async ({commit}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/patient`, null, null).then((response) => {
    commit('staffSummaryPatient', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}