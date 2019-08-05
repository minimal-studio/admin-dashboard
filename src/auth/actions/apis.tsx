import { $R } from '../../services/req-filter';

export const AUTH_APIS = {
  LOGIN: '/auth-login',
  LOGOUT: '/logout'
};

async function login(data) {
  // return $R.post(AUTH_APIS.LOGIN, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data,
        err: null
      });
    }, 500);
  });
}

async function logout() {
  return $R.post(AUTH_APIS.LOGOUT, {});
}

Object.assign(AUTH_APIS, {
  login,
  logout
});
