import serviceMethod from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { errorSwal, successSwal } from '../../commonMethods/commonMethod'

export const getVital = async ({
  commit
}, data) => {
  let arrayData = []
  let errorMsg = ''
  if (!data == '') {
    await data.forEach(element => {
      serviceMethod.common("get", API_ENDPOINTS['getVital'] + "/" + element, null, null).then((response) => {

        response.data.data.forEach(field => {

          arrayData.push(field)

        });
        commit('getVitals', arrayData);

      }).catch((error) => {
        if (error.response.status === 422) {
          errorMsg = error.response.data
        } else if (error.response.status === 500) {
          errorMsg = error.response.data.message
        } else if (error.response.status === 401) {
          errorMsg = error.response.data.message
        }
        errorSwal(errorMsg)
      })
    });


  }
  // serviceMethod.common("get", API_ENDPOINTS['getVital']+"/"+99, null,null).then((response) => {

  //   response.data.data.forEach(field => {

  //     arrayData.push(field)

  //   });
  //   commit('getVitals', arrayData);

  // }).catch((error) => {
  //   if(error.response.status === 422){
  //     errorMsg= error.response.data
  //   }else if(error.response.status === 500){
  //     errorMsg=error.response.data.message
  //   }else if(error.response.status === 401){
  //     errorMsg=error.response.data.message
  //   }
  // }) 

}


export const addGeneralParameterGroup = async ({
  commit
}, data) => {
  await serviceMethod.common("post", API_ENDPOINTS['generalParameter'], null, data).then((response) => {
    commit('getVitals', '');
    commit('vitalSuccessMsg', response.data.message)
    successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  })


}
export const generalParameterList = async ({
  commit
}) => {
  await serviceMethod.common("get", API_ENDPOINTS['generalParameter'], null, null).then((response) => {
    commit('vitalSuccessList', response.data.data)
  
  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  })


}
export const generalParameterDelete = async ({
  commit
},id) => {
  await serviceMethod.common("delete", API_ENDPOINTS['deleteParameter'], id, null).then((response) => {
    successSwal(response.data.message)
    commit('vitalSuccessMsg', '')
  }).catch((error) => {
    if (error.response.status === 422) {
      errorSwal(error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      errorSwal(error.response.data.message)
    }
  })


}