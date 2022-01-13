import serviceMethod from '../../services/serviceMethod';

export const globalCodes = async ({ commit }) => {
    await serviceMethod.common("get", "globalCodeCategory", null, null).then((response) => {
        console.log("response",response.data.data)
        commit('globalCodes', response.data.data);
    }).catch((error) => {
        if (error.response.status == 401) {
            //AuthService.logout();
        }
        commit('failure', error.response.data);
    })
}
