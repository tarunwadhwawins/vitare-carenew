
export const loginSuccess = async (state, login) => {
  //console.log("login",login)
  state.token = login;
  state.loginErrorMsg = null;
}

export const logoutSuccess = async (state, logout) => {
  state.logout = logout;
  state.token = '';
  state.loginErrorMsg = null;
}

export const refreshTokenSuccess = async (state, token) => {
  state.refreshToken = token;
  state.loginErrorMsg = null;
}

export const failure = (state, error) => {
  state.loginErrorMsg = error;
}