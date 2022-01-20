import serviceMethod from '../../services/serviceMethod';

export const demographics = async ({
  commit
}, data) => {
  await serviceMethod.common("post", "patient", null, data).then((response) => {
    console.log("response", response.data.data)
    commit('demographics', response.data.data);
    commit('counterPlus')
    commit('successMsg', response.message);
    alert(response.message);
  }).catch((error) => {
    commit('errorMsg', error); 
    alert(error);
  })
}

export const patients = async ({
  commit
}, id) => {
  await serviceMethod.common("get", `patient`, null, null).then((response) => {
    console.log("response", response.data.data)
    commit('patients', response.data.data);
  }).catch((error) => {
    commit('errorMsg', error);
  })

}


export const conditions = async ({
  commit
}, data) => {
  console.log('data', data)
  await serviceMethod.common("post", `patient/${data.id}/condition`, null, data.data).then((response) => {
    console.log("response", response.data.data)
    commit('conditions', response.data.data);
  }).catch((error) => {
    commit('failure', error.response.data);
  })
}
export const patientReferals = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/referals`, null, data.data).then((response) => {
    console.log("response", response.data.data)
    commit('patientReferals', response.data.data);
  }).catch((error) => {
    commit('failure', error.response.data);
  })

}
export const patientPhysician = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/physician`, null, data.data).then((response) => {
    console.log("response", response.data.data)
    commit('patientPhysician', response.data.data);
    commit('counterPlus')
  }).catch((error) => {
    commit('failure', error.response.data);
  })

}


export const programList = async ({
  commit
}, data) => {
  await serviceMethod.common("get", `program`, null, data).then((response) => {
    console.log("response", response.data.data)
    commit('programList', response.data.data);
  }).catch((error) => {
    commit('failure', error);
  })

}

export const addProgram = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/program`, null, data.data).then((response) => {
    console.log("response", response.data.data)
    commit('addProgram', response.data.data);
    commit('counterPlus')
  }).catch((error) => {
    commit('failure', error.response.data);
  })

}




export const program = async ({
  commit
}, id) => {
  await serviceMethod.common("get", `patient/${id}/program`, null, null).then((response) => {
    console.log("response", response.data.data)
    commit('program', response.data.data);
    commit('counterPlus')
  }).catch((error) => {
    commit('failure', error.response.data);
  })

}

export const addDevice = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/inventory`, null, data.data).then((response) => {
    console.log("response", response.data.data)
    commit('addDevice', response.data.data);
    commit('counterPlus')
  }).catch((error) => {
    commit('failure', error.response.data);
  })

}
