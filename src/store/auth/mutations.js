
// Checkig login status if its success
export const loginSuccess = (state, resp) => {
    state.isLoggedIn = true;
    state.userData=resp;
}

// After login storing permissions
export const permissions = (state,resp) =>{
    state.permissions = resp
  
}

// Checkig login status if its failed
export const loginFailure = (state, error) => {
    state.isLoggedIn = false;
    state.token = '';
    state.errorMsg = error;
    

}

// Logout method
export const logout = (state) => {
    state.isLoggedIn = false;
    state.token='';
  
}


