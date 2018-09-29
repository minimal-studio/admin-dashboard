import { $request } from 'uke-request';

export const AUTH_APIS = {
  LOGIN : 'admin_login',
  LOGOUT: 'admin_logout'
};

async function login(data) {
  let sendData = {
    data
  };

  return $request.send({sendData, path: '/auth-login'});
}

async function logout() {
  let sendData = {
    method: 'admin_logout',
    data: {}
  };
  return $request.send({sendData});
}

Object.assign(AUTH_APIS, {
  login,
  logout
});
