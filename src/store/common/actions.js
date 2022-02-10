import serviceMethod from '../../services/serviceMethod';

export const globalCodes = async ({
  commit
}) => {
  await serviceMethod.common("get", "globalCodeCategory", null, null).then((response) => {
     
    commit('globalCodes', response.data.data);
    
  }).catch((error) => {
    if (error.response.status == 401) {
      //AuthService.logout();
    }
    commit('failure', error.response.data);
  })
}
export const permissions = async ({
  commit
}) => {

    commit('dashboardPermissions', localStorage.getItem('auth'));

    commit('patientsPermissions', localStorage.getItem('auth'));
 
}


