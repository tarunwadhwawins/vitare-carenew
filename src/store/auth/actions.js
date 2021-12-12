import AuthService from '../../services/auth.service';
import router from "@/router"

export const login = async({ commit }, user) => {
    return await AuthService.login(user).then(
        user => {
            commit('loginSuccess', user);
            router.push('/')
        },
        
        error => {
            commit('loginFailure', error);
        }
    );
}
export const logout = ({ commit }) => {
    AuthService.logout();
    commit('logout');
}
