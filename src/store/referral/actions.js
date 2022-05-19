import ServiceMethodService from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"
import { errorLogWithDeviceInfo} from '@/commonMethods/commonMethod'
export const referralList = async ({ commit },page) => {
	commit('loadingTableStatus', true)
	let link =page ? API_ENDPOINTS['referralList'] +page : API_ENDPOINTS['referralList']
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		commit('referralList', response.data);
		
			commit('loadingTableStatus', false)
	
		
	})
	.catch((error) => {
		errorLogWithDeviceInfo(error.response)
		commit('loadingTableStatus', false)
		commit('errorMsg', error.response.data)

	})
}

