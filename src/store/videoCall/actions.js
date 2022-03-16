import serviceMethod from '@/services/serviceMethod';
import {  errorSwal } from '@/commonMethods/commonMethod';


export const getVideoDetails = async ({commit},id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `appointment/conference/${id}`, null, null).then((response) => {
    commit('getVideoDetails', response.data.data);
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
      commit('loadingStatus', false)
    }
  })
}


export const acceptVideoCallDetails = async ({commit},id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `user/${id}`, null, null).then((response) => {
    commit('acceptVideoCallDetails', response.data.data);
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
      commit('loadingStatus', false)
    }
  })
}


export const callNotification = async ({commit},data) => {
  commit('loadingStatus', true)
  await serviceMethod.common('patch', `call/notification/${data.id}?status=${data.status}`, null, true).then((response) => {
    commit('callNotification', response.data.data);
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
      commit('loadingStatus', false)
    }
  })
}