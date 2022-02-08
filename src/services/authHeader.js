export default function authHeader(withoutToken) {
  let user = JSON.parse(localStorage.getItem('user'));
  if(withoutToken){
    return {};
  }else{
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}
}