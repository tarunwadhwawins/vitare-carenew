import serviceMethod from '../../services/serviceMethod'
import { API_ENDPOINTS } from "../../config/apiConfig"
import { errorSwal } from '../../commonMethods/commonMethod'

export const getVital = async ({
  commit
}, data) => {
  let arrayData = []
  let errorMsg=''
  if(!data==''){
    await  data.forEach(element => { 
       serviceMethod.common("get", API_ENDPOINTS['getVital']+"/"+element, null,null).then((response) => {
      
      response.data.data.forEach(field => {
        
        arrayData.push(field)
        
      });
      commit('getVitals', arrayData);
      
    }).catch((error) => {
      if(error.response.status === 422){
        errorMsg= error.response.data
      }else if(error.response.status === 500){
        errorMsg=error.response.data.message
      }else if(error.response.status === 401){
        errorMsg=error.response.data.message
      }
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



 if(errorMsg){
  errorSwal(errorMsg)
 }
}
