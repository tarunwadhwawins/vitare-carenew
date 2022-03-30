import serviceMethod from '@/services/serviceMethod';


export const errorLogWithDeviceInfo = async ({commit}, data) => {
  console.log('commit',commit);
  let response = await serviceMethod.common("post", `errorLog/with/deviceInfo`, null, data)
   console.log('exportReportRequest', response.data.data);
 }