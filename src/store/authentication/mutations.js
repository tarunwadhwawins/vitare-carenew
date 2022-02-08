
export const loginSuccess = async (state, login) => {
  state.loggedInUser = login;
  state.loginErrorMsg = null;
}

export const logoutSuccess = async (state, logout) => {
  state.logout = logout;
  state.loginErrorMsg = null;
}

export const refreshTokenSuccess = async (state, token) => {
  state.refreshToken = token;
  state.loginErrorMsg = null;
}

export const failure = (state, error) => {
  state.loginErrorMsg = error;
}