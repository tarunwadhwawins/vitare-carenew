export default {
  loggedInUser: JSON.parse(localStorage.getItem('auth')),
  logout: null,
  token:null,
  refreshToken: null,
  errorMsg: null,
  options:'test',
  server:'wss://dev.icc-health.com:7443',
  simpleUser:null

}