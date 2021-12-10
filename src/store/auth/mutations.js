export const loginSuccess = (state, user) => {
    state.status.loggedIn = true;
    state.user = user;
}
export const loginFailure = (state, error) => {
    state.status.loggedIn = false;
    state.user = error;
}
export const logout = (state) => {
    state.status.loggedIn = false;
    state.user = null;
}
export const registerSuccess = (state) => {
    state.status.loggedIn = false;
}
export const registerFailure = (state) => {
    state.status.loggedIn = false;
}

