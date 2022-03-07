import serviceMethod from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { errorSwal, successSwal } from '../../commonMethods/commonMethod'

export const programList = async ({
  commit
}, page) => {
  let link = page ? API_ENDPOINTS['programsList'] + page : API_ENDPOINTS['programsList']

  await serviceMethod.common("get", link, null, null).then((response) => {

    commit('programList', response.data);

  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  });


}

export const addProgram = async ({
  commit
}, data) => {

  console.log("data", data.data)
  await serviceMethod.common("post", API_ENDPOINTS['programsList'], null, data.data).then((response) => {

    commit('programMsg', response.data.message);
    successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  });


}
export const editProgram = async ({
  commit
}, id) => {


  await serviceMethod.common("get", API_ENDPOINTS['programsList'], id, null).then((response) => {

    commit('editProgram', response.data.data)

  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  });


}
export const updateProgram = async ({
  commit
}, data) => {
  await serviceMethod.common("put", API_ENDPOINTS['programsList'], data.id, data.data).then((response) => {
    commit('programMsg', response.data.message);
    successSwal(response.data.message)

  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  });


}
export const deleteProgram = async ({
  commit
}, id) => {
  await serviceMethod.common("delete", API_ENDPOINTS['programsList'], id, null).then((response) => {
    commit('programMsg', response.data.message);
    successSwal(response.data.message)

  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  });


}
