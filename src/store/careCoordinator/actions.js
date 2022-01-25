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
    commit('errorMsg', error);
    alert(error)
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
