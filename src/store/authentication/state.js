export default {
  loggedInUser: JSON.parse(localStorage.getItem('auth')),
  loggedInUserDetails: null,
  logout: null,
  token:null,
  refreshToken: null,
  errorMsg: null,
  options:null,
  server:'wss://tele.icc-health.com:7443',
  simpleUser:null,//localStorage.getItem("simpleUser"),
  accessPermission:JSON.parse(localStorage.getItem('accessPermission')),
  

}