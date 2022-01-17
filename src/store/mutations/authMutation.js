export const loginSuccess = (state, user) => {
    state.isLoggedIn = true;
    state.token=user;
}
export const loginFailure = (state, error) => {
    state.isLoggedIn = false;
    state.token='';
}
export const logout = (state) => {
    state.isLoggedIn = false;
    state.token='';
  
}


