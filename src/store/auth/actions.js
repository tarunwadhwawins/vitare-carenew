import AuthService from '../../services/auth.service';
import router from "@/router"

// const userData = JSON.parse(localStorage.getItem("user"))
export const login = async({ commit,state }, user) => {
    try{
     const response = await  AuthService.login(user)
            // console.log('userData',response.data.data)
            localStorage.setItem("auth", true);
            localStorage.setItem('user', JSON.stringify(response.data.data));
            commit('loginSuccess', response.data.data);
            state.isLoading=false;
            router.push("/dashboard")
    }catch(error)
     {
       commit('loginFailure', error);
     }
}
export const logout = ({ commit }) => {
    
    AuthService.logout();
    commit('logout');
    
    
}
