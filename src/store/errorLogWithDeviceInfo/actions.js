import serviceMethod from '@/services/serviceMethod';


export const errorLogWithDeviceInfo = async ({commit}, data) => {
  commit('loadingStatus', true)
  console.log('commit',commit);
  await serviceMethod.common("post", `errorLog/with/deviceInfo`, null, data).then((response) => {
    console.log('errorLogWithDeviceInfo', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    if(error.response.status === 500) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
 }