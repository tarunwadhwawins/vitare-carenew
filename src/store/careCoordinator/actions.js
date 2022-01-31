import serviceMethod from '../../services/serviceMethod';
import Swal from 'sweetalert2'

export const addStaff = async ({
  commit
}, data) => {
  await serviceMethod.common("post", "staff", null, data).then((response) => {
    console.log("response", response.data.data)
    commit('addStaff', response.data.data);
    commit('successMsg', response.message);
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
  })
  Toast.fire({
      icon: 'success',
      title: 'Form submitted successfully!'
  })
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

export const staffs = async ({commit}, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", "staff", null, data).then((response) => {
    commit('staffs', response.data.data);
    commit('loadingStatus', false)
    commit('successMsg', response.message);
  }).catch((error) => { 
    commit('errorMsg', error);
    commit('loadingStatus', false)
  })
}
