import serviceMethod from '@/services/serviceMethod';
import {
  errorLogWithDeviceInfo
} from '@/commonMethods/commonMethod'


export const escalation = async ({
  commit
}, data) => {
  console.log("check", data)
  let link = null
  if (data) {
    if (data.entityType) {
      link = data.entityType ? `escalation?referenceId=${data.referenceId}&entityType=${data.entityType}` : `escalation?referenceId=${data.referenceId}&entityType=${data.entityType}`
    } else {
      link = data ? `escalation` + data : `escalation`
    }

  } else {
    link = 'escalation'
  }
  commit('loadingStatus', true)
  await serviceMethod.common("get", link, null, null).then((response) => {
    commit('escalation', response.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    commit('loadingStatus', false)
    // errorSwal(error.response.data.message)
  })
}

export const escalationStaus = async ({
  commit
}) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `escalation/Assign/status`, null, null).then((response) => {
    commit('escalationStaus', response.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    commit('loadingStatus', false)
    // errorSwal(error.response.data.message)
  })
}


export const addBasicEscalation = async ({
  commit
}, data) => {
  let status = false
  commit('loadingStatus', true)
  await serviceMethod.common("post", `escalation`, null, data).then((response) => {
    commit('addBasicEscalation', response.data.data)
    // successSwal(response.data.message)
    commit('escalationCounterPlus')
    commit('loadingStatus', false)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
  return status
}


export const updateBasicEscalation = async ({
  commit
}, data) => {
  let status = false
  commit('loadingStatus', true)
  await serviceMethod.common("put", `escalation/${data.escalationId}`, null, data).then((response) => {
    commit('updateBasicEscalation', response.data.data)
    // successSwal(response.data.message)
    commit('escalationCounterPlus')
    commit('loadingStatus', false)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
  return status
}


export const esacalationFlagList = async ({
  commit
}, data) => {
  try {
    commit('loadingStatus', true)
    if (data.date) {
      let response = await serviceMethod.common("get", `patient/${data.id}/flag?fromDate=${data.date.fromDate}&toDate=${data.date.toDate}`, null, null)
      commit('esacalationFlagList', response.data.data)
      commit('loadingStatus', false)
    } else {
      let response = await serviceMethod.common("get", `patient/${data.id}/flag`, null, null)
      commit('esacalationFlagList', response.data.data)
      commit('loadingStatus', false)
    }
  } catch (error) {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  }
}

export const escalationNotesList = async ({
  commit
}, data) => {
  try {

    commit('loadingStatus', true)
    if (data.date) {
      let response = await serviceMethod.common("get", `patient/${data.id}/notes?fromDate=${data.date.fromDate}&toDate=${data.date.toDate}`, null, null)
      commit('escalationNotesList', response.data.data)
      commit('loadingStatus', false)
    } else {
      let response = await serviceMethod.common("get", `patient/${data.id}/notes`, null, null)
      commit('escalationNotesList', response.data.data)
      commit('loadingStatus', false)
    }
  } catch (error) {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  }
}

export const esacalationCarePlansList = async ({
  commit
}, data) => {
  try {
    commit('loadingStatus', true)
    if (data.date) {
      let response = await serviceMethod.common("get", `patient/${data.id}/goal?fromDate=${data.date.fromDate}&toDate=${data.date.toDate}`, null, null)
      console.log('carePlan', response.data.data);
      commit('esacalationCarePlansList', response.data.data)
      commit('loadingStatus', false)
    } else {
      let response = await serviceMethod.common("get", `patient/${data.id}/goal`, null, null)
      console.log('carePlan', response.data.data);
      commit('esacalationCarePlansList', response.data.data)
      commit('loadingStatus', false)
    }
  } catch (error) {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  }
}



export const escalationVitalList = async ({
  commit
}, data) => {
  try {
    commit('loadingStatus', true)
    if (data.date) {
      let response = await serviceMethod.common("get", `patient/${data.id}/vital?fromDate=${data.date.fromDate}&toDate=${data.date.toDate}`, null, null)
      commit('escalationVitalList', response.data.data)
      commit('loadingStatus', false)
    } else {
      let response = await serviceMethod.common("get", `patient/${data.id}/vital`, null, null)
      commit('escalationVitalList', response.data.data)
      commit('loadingStatus', false)
    }
  } catch (error) {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  }
}








export const singleEscalationRecord = async ({
  commit
}, id) => {
  try {
    commit('loadingStatus', true)
    let response = await serviceMethod.common("get", `escalation/${id}`, null, null)
    commit('singleEscalationRecord', response.data.data)
    commit('loadingStatus', false)
  } catch (error) {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  }
}



export const addEscalationDetails = async ({
  commit
}, data) => {
  let status = false
  try {
    commit('loadingStatus', true)
    if (data.escalationDetails.notesId.length > 0 && data.escalationId) {
      let response = await serviceMethod.common("post", `escalation/notes/${data.escalationId}`, null, {
        notesId: data.escalationDetails.notesId,
        escalationType: 260
      })
      response ? status = true : status = false
    }

    if (data.escalationDetails.vitalId.length > 0 && data.escalationId) {
      let response = await serviceMethod.common("post", `escalation/vital/${data.escalationId}`, null, {
        vitalId: data.escalationDetails.vitalId,
        escalationType: 259
      })
      response ? status = true : status = false
    }

    if (data.escalationDetails.carePlan.length > 0 && data.escalationId) {
      let response = await serviceMethod.common("post", `escalation/carePlan/${data.escalationId}`, null, {
        carePlan: data.escalationDetails.carePlan,
        escalationType: 262
      })
      response ? status = true : status = false
    }

    if (data.escalationDetails.flagIds.length > 0 && data.escalationId) {
      let response = await serviceMethod.common("post", `escalation/flag/${data.escalationId}`, null, {
        flagIds: data.escalationDetails.flagIds,
        escalationType: 261
      })
      response ? status = true : status = false
    }
  } catch (error) {
    errorLogWithDeviceInfo(error.response)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  }

  return status
}
