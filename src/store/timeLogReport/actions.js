import ServiceMethodService from '@/services/serviceMethod'
import { successSwal, errorSwal } from '@/commonMethods/commonMethod';
// import { API_ENDPOINTS } from "@/config/apiConfig"



export const timeLogReportList = async ({ commit },page) => {
	commit('loadingStatus', true)
	let link =page? "timeLog"+page :"timeLog"
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		commit('timeLogReportList', response.data);
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


export const editAuditTimeLog = async ({ commit },id) => {
	await ServiceMethodService.common("get", `timeLog/${id}`, null, null).then((response) => {
		commit('editAuditTimeLog', response.data.data);
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


export const updateAuditTimeLog = async ({ commit },data) => {
	await ServiceMethodService.common("put", `timeLog/${data.id}`, null, data.data).then((response) => {
		commit('updateTimeLog', response.data.data);
		successSwal(response.data.message)
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


export const deleteTimeLog = async ({ commit },uuid) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("delete", `timeLog/${uuid}`, null, null).then((response) => {
		commit('deleteTimeLog', response.data.data);
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
