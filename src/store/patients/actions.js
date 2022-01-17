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


export const conditions = async ({
  commit
}, data) => {
  let counter = null
  if (counter == 1) {
    await serviceMethod.common("post", "patientCondition/1", null, data).then((response) => {
      console.log("response", response.data.data)
      commit('conditions', response.data.data);
      counter = 1
    }).catch((error) => {
      if (error.response.status == 401) {
        //AuthService.logout();
      }
      commit('failure', error.response.data);
    })
  }
  if (counter == 2) {
    await serviceMethod.common("post", "patientReferals/1", null, data).then((response) => {
        console.log("response", response.data.data)
        commit('patientReferals', response.data.data);
        counter = 2
      }).catch((error) => {
        if (error.response.status == 401) {
          //AuthService.logout();
        }
        commit('failure', error.response.data);
      })
  }

  if (counter == 3) {
    await serviceMethod.common("post", "patientPhysician/1", null, data).then((response) => {
        console.log("response", response.data.data)
        commit('patientPhysician', response.data.data);
        counter = 3
      }).catch((error) => {
        if (error.response.status == 401) {
          //AuthService.logout();
        }
        commit('failure', error.response.data);
      })
  }
}
