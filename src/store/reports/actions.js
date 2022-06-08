import serviceMethod from '@/services/serviceMethod';
import {  errorLogWithDeviceInfo } from '@/commonMethods/commonMethod';


export const reportList = async ({commit}) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `cptCodes`, null, null).then((response) => {
    commit('reportList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}
