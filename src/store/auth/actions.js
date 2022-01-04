import AuthService from '../../services/auth.service';
import router from "@/router"

// const userData = JSON.parse(localStorage.getItem("user"))
export const login = async({ commit,state }, user) => {
      await  AuthService.login(user).then((response) => {
        console.log('==>',response)
            commit('loginSuccess', response);
            commit('permissions',response.roleAndPermission)
            state.isLoading=false;
            // console.log("then",response)
            if(response.login=='MasterLogin'){
                router.push("/dashboard")
            }else{
                router.push("/emp-dashboard")
            }
           
         })
    .catch((error) => {
        commit('loginFailure', error.response);
    })
}
export const logout = ({ commit }) => {
    
    AuthService.logout();
    commit('logout');
    
    
}
