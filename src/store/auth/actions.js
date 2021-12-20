import AuthService from '../../services/auth.service';
import router from "@/router"

export const login = async({ commit }, user) => {
      await  AuthService.login(user).then((response) => {
            commit('loginSuccess', response);
            router.push("/dashboard")
         })
    .catch((error) => {
        commit('loginFailure', error.response.data);
    })
}
export const logout = ({ commit }) => {
    AuthService.logout();
    commit('logout');
    
}
