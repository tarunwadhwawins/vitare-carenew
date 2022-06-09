import serviceMethod from '@/services/serviceMethod';
import {  errorLogWithDeviceInfo } from '@/commonMethods/commonMethod';


export const cptCodes = async ({commit},page) => {
commit('loadingTableStatus', true)  
let link =page ? `cptCodes` +page :`cptCodes`
await serviceMethod.common("get", link, null, null).then((response) => {
    commit('cptCodes', response.data);
    commit('loadingTableStatus', false)
  }).catch((error) => {
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
        commit('loadingTableStatus', false)
			} else {
				errorLogWithDeviceInfo(error);
        commit('loadingTableStatus', false)
			}
  })
}

export const reportDetailList = async ({commit},id) => {
  commit('loadingTableStatus', true)  
  await serviceMethod.common("get", `cptCodes/${id}`, null, null).then((response) => {
      commit('reportDetailList', response.data.data);
      if(response.data.data.vital?.length>0){
        commit('patientVitals', response.data.data.vital);
      }
      commit('loadingTableStatus', false)
    }).catch((error) => {
      if (error.response) {
          errorLogWithDeviceInfo(error.response);
          commit('loadingTableStatus', false)
        } else {
          errorLogWithDeviceInfo(error);
          commit('loadingTableStatus', false)
        }
    })
  }