import serviceMethod from '../../services/serviceMethod';

export const globalCodes = async ({
  commit
}) => {
  await serviceMethod.common("get", "globalCodeCategory", null, null).then((response) => {
    console.log("response", response.data.data)
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
  }).catch((error) => {
    if (error.response.status == 401) {
      //AuthService.logout();
    }
    commit('failure', error.response.data);
  })
}


export const conditions = async ({commit}, data) => {
    await serviceMethod.common("post", "patientCondition/1", null, data).then((response) => {
      console.log("response", response.data.data)
      commit('conditions', response.data.data);
    }).catch((error) => {
      if (error.response.status == 401) {
        //AuthService.logout();
      }
      commit('failure', error.response.data);
    })
}

  
    export const patientReferals = async ({commit}, data) => {
    await serviceMethod.common("post", "patientReferals/1", null, data).then((response) => {
      console.log("response", response.data.data)
      commit('patientReferals', response.data.data);
    }).catch((error) => {
      if (error.response.status == 401) {
        //AuthService.logout();
      }
      commit('failure', error.response.data);
    })
  }

  export const patientPhysician = async ({commit}, data) => {
    await serviceMethod.common("post", "patientPhysician/1", null, data).then((response) => {
      console.log("response", response.data.data)
      commit('patientPhysician', response.data.data);
    }).catch((error) => {
      if (error.response.status == 401) {
        //AuthService.logout();
      }
      commit('failure', error.response.data);
    })
  }

