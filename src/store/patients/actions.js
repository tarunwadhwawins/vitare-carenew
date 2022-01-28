import serviceMethod from '../../services/serviceMethod';

export const demographics = async ({
  commit
}, data) => {
  await serviceMethod.common("post", "patient", null, data).then((response) => {
    console.log("response", response.data.data)
    commit('demographics', response.data.data);
    commit('counterPlus')
    commit('successMsg', response.message);
    alert("Form submitted successfully!")
  }).catch((error) => {
    if(error.response.status === 422){
      commit('errorMsg', error.response.data)
    }else if(error.response.status === 500){
      commit('errorMsg', error.response.data.message)
    }else if(error.response.status === 401){
      commit('errorMsg', error.response.data.message)
    }
    alert(error.response.data.message) 
  })
}

export const patients = async ({
  commit
}) => {
  await serviceMethod.common("get", `patient`, null, null).then((response) => {
    console.log("patientsList", response.data.data)
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
    // alert(error.response.data.message)  
  })
}
export const patientReferals = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/referals`, null, data.data).then((response) => {
    console.log("response", response.data.data)
    commit('patientReferals', response.data.data);
  }).catch((error) => {
    commit('errorMsg', error.response.data);
    console.log('check',error.response.data)
    // alert(error.response.data.message) 
  })

}
export const patientPhysician = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/physician`, null, data.data).then((response) => {
    console.log("response", response.data.data)
    commit('patientPhysician', response.data.data);
    commit('counterPlus')
    alert("Form submitted successfully!")
  }).catch((error) => {
    commit('errorMsg', error.response.data);
    console.log('check',error.response.data)
    // alert(error.response.data.message) 
  })

}


export const programList = async ({
  commit
}, data) => {
  await serviceMethod.common("get", `program`, null, data).then((response) => {
    console.log("programList", response.data.data)
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
    alert("Form submitted successfully!")
  }).catch((error) => {
    commit('failure', error.response.data);
    alert(error.response.data.message) 
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
    alert("Form submitted successfully!")
  }).catch((error) => {
    commit('failure', error.response.data);
    alert(error.response.data.message) 
  })

}

let temp =[]

export const parameterFields = async ({
  commit
}, id) => {
  await serviceMethod.common("get", `field/${id}`, null, null).then((response) => {
    console.log("response", response.data.data)
    temp[id] = response.data.data
    commit('parameterFields', temp)
  }).catch((error) => {
    commit('failure', error.response.data)
    alert(error.response.data.message) 
  })
//  commit('fields',temp )
}


export const parameter = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/vital`, null, {vital:data.vital}).then((response) => {
    console.log("response", response.data.data)
    commit('parameter', response.data.data);
    alert("Form submitted successfully!")
  }).catch((error) => {
    commit('failure', error.response.data);
    alert(error.response) 
  })

}