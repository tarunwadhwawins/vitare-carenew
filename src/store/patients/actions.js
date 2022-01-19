import serviceMethod from '../../services/serviceMethod';

export const globalCodes = async ({
  commit
}) => {
  await serviceMethod.common("get", "globalCodeCategory", null, null).then((response) => {
    // console.log("globalCodes", response.data.data)
    commit('globalCodes', response.data.data);
    
  }).catch((error) => {
    if (error.response.status == 401) {
      //AuthService.logout();
    }
    commit('failure', error.response.data);
  })
}


export const demographics = async ({
  commit
}, data) => {
  await serviceMethod.common("post", "patient", null, data).then((response) => {
    console.log("response", response.data.data)
    commit('demographics', response.data.data);
    commit('counterPlus')
    alert(response.data.message);
  }).catch((error) => {
    if (error.response.status == 401) {
      //AuthService.logout();
    }
    commit('failure', error.response.data);
  })
}


export const conditions = async ({
  commit
}, data) => {
  console.log('data', data)
  // let physicianData={}
  // if (data.checked == true) {
  //         data.name= data.physician.name,
  //         data.designation= data.physician.designation,
  //         data.email= data.physician.email,
  //         data.phoneNumber= data.physician.phoneNumber,
  //         data.fax= data.physician.fax
  // }else{
  //     physicianData.name= data.physician.name,
  //     physicianData.designation= data.physician.designation,
  //     physicianData.email= data.physician.email,
  //     physicianData.phoneNumber= data.physician.phoneNumber,
  //     physicianData.fax= data.physician.fax
  // }

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
    commit('failure', error.response.data);
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
