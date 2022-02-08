export default function authHeader(withoutToken) {
  let token = localStorage.getItem('token');
  if(withoutToken) {
    return {};
  }
  else {
    if (token) {
      return { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };
    }
    else {
      return {};
    }
  }
}