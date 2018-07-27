export const AUTH_APIS = {
  LOGIN : 'admin_login',
  LOGOUT: 'logout'
}

async function login(data) {
  let sendData = {
    method: AUTH_APIS.LOGIN,
    params: {
      AdminName: data.AdminName
    },
    Data: data
  };

  return $request.send({sendData});
}

async function logout() {
  let sendData = {
    method: 'admin_logout',
    data: {}
  };
  return $request.send({sendData})
}

Object.assign(AUTH_APIS, {
  login,
  logout
});
