import serviceMethod from '@/services/serviceMethod';
import { successSwal, errorSwal, errorLogWithDeviceInfo } from '@/commonMethods/commonMethod';
import router from "../../router/index"


export const eventType = async ({ commit }, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common('get', `workflow/event?eventType=${id}`, null, null).then((response) => {
    commit('eventType', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
}

export const addWorkFlow = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('post', `workflow`, null, data).then((response) => {
    commit('addWorkFlow', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
    router.push({ name: 'workflowDetails', params: { udid: response.data.data.id }  })
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}



export const updateWorkFlow = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('put', `workflow/${data.id}`, null, data.data).then((response) => {
    commit('updateWorkFlow', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}


export const workflowList = async ({ commit }) => {
  commit('loadingStatus', true)
  await serviceMethod.common('get', `workflow`, null, null).then((response) => {
    commit('workflowList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
}

export const editWorkflow = async ({ commit },id) => {
  commit('loadingStatus', true)
  await serviceMethod.common('get', `workflow/${id}`, null, null).then((response) => {
    commit('editWorkflow', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
}



export const workflowColumn = async ({ commit }, id) => {
  commit('loadingStatus', true)
  try {
    let response = await serviceMethod.common('get', `workflow/${id}`, null, null)
    commit('workflowCriteria', response.data.data);
    if (response.data.data) {
      try {
        let resp = await serviceMethod.common('get', `workflow/event/${response.data.data.eventId}/column`, null, null)
        commit('workflowColumn', resp.data.data);
        commit('loadingStatus', false)
      } catch (error) {
        errorLogWithDeviceInfo(error)
        if (error.response.status === 422) {
          commit('errorMsg', error.response.data)
          commit('loadingStatus', false)
        } else if (error.response.status === 500) {
          errorSwal(error.response.data.message)
          commit('loadingStatus', false)
        } else if (error.response.status === 401) {
          commit('loadingStatus', false)
        }
      }
    }
  }
  catch (error) {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  }
}

export const addWorkflowCriteria = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('put', `workflow/${data.id}/criteria`, null, {criteria:data.criteria}).then((response) => {
    commit('addWorkflowCriteria', response.data.data);
    commit('loadingStatus', false)
    commit('counterPlus')
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}

export const editWorkflowCriteria = async ({ commit },id) => {
  commit('loadingStatus', true)
  await serviceMethod.common('get', `workflow/${id}/criteria`, null, null).then((response) => {
    commit('editWorkflowCriteria', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
}



export const addGroupAction = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('post', `workflow/${data.id}/step`, null, data.data).then((response) => {
    commit('addGroupAction', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}


export const groupActionList = async ({ commit }, id) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('get', `workflow/${id}/step`, null, null).then((response) => {
    commit('groupActionList', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}

export const editGroupAction = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('get', `workflow/${data.eventId}/step/${data.id}`, null, null).then((response) => {
    commit('editGroupAction', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}

export const updateGroupAction = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('put', `workflow/${data.eventId}/step/${data.id}`, null, data.data).then((response) => {
    commit('updateGroupAction', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}

export const deleteGroupAction = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('delete', `workflow/${data.eventId}/step/${data.id}`, null, null).then((response) => {
    commit('deleteGroupAction', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}



export const actionsOffset = async ({ commit }, id) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('get', `workflow/${id}/offset`, null, null).then((response) => {
    commit('actionsOffset', response.data.data);
    commit('loadingStatus', false)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}



export const actionsField = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('get', `workflow/${data.eventId}/alert/${data.actionId}/field`, null, null).then((response) => {
    commit('actionsField', response.data.data);
    commit('loadingStatus', false)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}


export const addActions = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('post', `workflow/${data.eventId}/step/${data.actionId}/action`, null, data.data).then((response) => {
    commit('addActions', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}

export const actionsList = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  try{
    if(data.eventId && data.actionId){
      let response = await serviceMethod.common('get', `workflow/${data.eventId}/step/${data.actionId}/action`, null, null)
         commit('actionsList', response.data.data);
         commit('loadingStatus', false)
         successSwal(response.data.message)
         status = true
    }
  }
  catch(error){
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  }
  return status
}

export const deleteActions = async ({ commit }, data) => {
  commit('loadingStatus', true)
  let status=false;
  await serviceMethod.common('delete', `workflow/${data.eventId}/step/${data.actionId}/action/${data.id}`, null, null).then((response) => {
    commit('deleteActions', response.data.data);
    commit('loadingStatus', false)
    successSwal(response.data.message)
    status = true
  }).catch((error) => {
    errorLogWithDeviceInfo(error)
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      commit('loadingStatus', false)
    }
  })
  return status
}

