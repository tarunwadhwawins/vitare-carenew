import serviceMethod from '../../services/serviceMethod';


export const addStaff = async ({
  commit
}, data) => {
  await serviceMethod.common("post", "staff", null, data).then((response) => {
    console.log("response", response.data.data)
    commit('addStaff', response.data.data);
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

export const staffs = async ({
  commit
}, data) => {
  await serviceMethod.common("get", "staff", null, data).then((response) => {
    console.log("response", response.data.data)
    commit('staffs', response.data.data);
    commit('successMsg', response.message);
  }).catch((error) => { 
    commit('errorMsg', error);
  })
}
