import serviceMethod from '../../services/serviceMethod'
import { successSwal, errorSwal } from '../../commonMethods/commonMethod'


export const addStaff = async ({
  commit
}, data) => {
  await serviceMethod.common("post", "staff", null, data).then((response) => {
    commit('addStaff', response.data.data);
    commit('counterPlus')
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



export const updateStaff = async ({
  commit
}, data) => {
  await serviceMethod.common("put", `staff/${data.id}`, null, data.data).then((response) => {
    commit('updateStaff', response.data.data);
    commit('counterPlus')
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

export const staffs = async ({commit}, page) => {
  let link = page ? 'staff'+page : 'staff'
commit('loadingStatus', true)
  await serviceMethod.common("get", link, null, null).then((response) => {
    commit('staffs', response.data);
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


export const addContacts = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `staff/${data.id}/contact`, null, data.data).then((response) => {
    commit('addContacts', response.data.data);
    successSwal(response.data.message)
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



export const staffContactList = async ({commit},id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/contact`, null, null).then((response) => {
    commit('staffContactList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}


export const deleteContact = async ({commit},data) => {
  await serviceMethod.common("delete", `staff/${data.id}/contact/${data.contactId}`, null, null).then((response) => {
    commit('deleteContact', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
  })
}




export const addAvailability = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `staff/${data.id}/availability`, null, data.data).then((response) => {
    commit('addAvailability', response.data.data);
    successSwal(response.data.message)
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



export const availabilityList = async ({commit},id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/availability`, null, null).then((response) => {
    commit('availabilityList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}


export const deleteAvailability = async ({commit},data) => {
  await serviceMethod.common("delete", `staff/${data.id}/availability/${data.availabilityID}`, null, null).then((response) => {
    commit('deleteAvailability', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
  })
}


export const roles = async ({commit}) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `roleList`, null, null).then((response) => {
    commit('roles', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}




export const addStaffRole = async ({
  commit
}, data) => {
  console.log('addRole',data.data)
  await serviceMethod.common("post", `staff/${data.id}/role`, null, data.data).then((response) => {
    commit('addStaffRole', response.data.data);
    successSwal(response.data.message)

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

export const roleList = async ({commit},id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/role`, null, null).then((response) => {
    commit('roleList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}


export const deleteStaffRole = async ({commit},data) => {
  await serviceMethod.common("delete", `staff/${data.id}/role/${data.roleID}`, null, null).then((response) => {
    commit('deleteStaffRole', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
  })
}



export const providers = async ({commit}) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `provider`, null, null).then((response) => {
    commit('providers', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}

export const addProvider = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `staff/${data.id}/provider`, null, data.data).then((response) => {
    commit('addProvider', response.data.data);
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


export const providerList = async ({commit},id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/provider`, null, null).then((response) => {
    commit('providerList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
    commit('loadingStatus', false)
  })
}

export const deleteProvider = async ({commit},data) => {
  await serviceMethod.common("delete", `staff/${data.id}/provider/${data.providerID}`, null, null).then((response) => {
    commit('deleteProvider', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => { 
    commit('errorMsg', error);
    if(error.response.status === 500){
      errorSwal(error.response.data.message)
    }
  })
}


export const addStaffDocument = async ({commit}, data) => {
  await serviceMethod.common("post", `staff/${data.id}/document`, null, data.data).then((response) => {
    commit('addStaffDocument', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })
}


export const deleteStaffDocument = async ({
  commit
}, data) => {
  await serviceMethod.common("delete", `staff/${data.id}/document/${data.documentId}`, null, null).then((response) => {
    commit('deleteStaffDocument', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}



export const staffDocuments = async ({
  commit
}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/document`, null, null).then((response) => {
    commit('staffDocuments', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('loadingStatus', false)
    errorSwal(error.response.data.message)
  })
}