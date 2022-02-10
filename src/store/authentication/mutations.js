
export const loginSuccess = async (state, login) => {

  state.token = login;
  state.loginErrorMsg = null;
}

export const logoutSuccess = async (state, logout) => {
  state.logout = logout;
  state.token = '';
  state.errorMsg = '';
}

export const refreshTokenSuccess = async (state, token) => {
  state.refreshToken = token;
  state.loginErrorMsg = null;
}

export const loginFailure = (state, error) => {
  
  state.errorMsg = error;
}