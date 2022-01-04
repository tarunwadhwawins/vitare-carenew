
// Checkig login status if its success
export const loginSuccess = (state, user) => {
    state.isLoggedIn = true;
    state.token=user;
}

// After login storing permissions
export const permissions = (state,userData) =>{
    
    state.permissions = userData
  
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


