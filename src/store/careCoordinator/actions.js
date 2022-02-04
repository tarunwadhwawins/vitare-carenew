import serviceMethod from '../../services/serviceMethod'
import { successSwal, errorSwal } from '../../commonMethods/commonMethod'


export const addStaff = async ({
  commit
}, data) => {
  await serviceMethod.common("post", "staff", null, data).then((response) => {
    commit('addStaff', response.data.data);
    commit('successMsg', response.message);
    // successSwal(response.data.message)
  }).catch((error) => {
    if(error.response.status === 422){
      commit('errorMsg', error.response.data)
    }else if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }else if(error.response.status === 401){
      commit('errorMsg', error.response.data.message)
    }
  })
}

export const staffs = async ({commit}, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", "staff", null, data).then((response) => {
    commit('staffs', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}

export const specializationStaff = async ({commit}) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", "staff/specialization/count", null, null).then((response) => {
    commit('specializationStaff', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}

export const networkStaff = async ({commit}) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", "staff/network/count", null, null).then((response) => {
    commit('networkStaff', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}
