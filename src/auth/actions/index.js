import createStore from 'unistore';
import { Call } from 'basic-helper';

import { AUTH_APIS } from './apis';
import NAV_MENU_CONFIG from '../../config/nav-config';

let defaultAuthStore = {
  userInfo: {},
  username: 'none',
  loginResDesc: '',
  logging: false,
  logouting: false,
  isLogin: false,
  sessID: 'none',
  menuStore: NAV_MENU_CONFIG
};
const authStore = createStore(defaultAuthStore);

function onLoginSuccess(store, resData) {
  let userInfo = resData;
  let username = resData.AdminName;
  userInfo.username = username;
  // let menuStore = (userInfo.Menus || {}).Child;
  let sessID = resData.SessId;
  // delete userInfo['Menus'];

  store.setState({
    logging: false,
    isLogin: true,
    sessID,
    username,
    userInfo,
    // menuStore
  });

  window.$GH.EventEmitter.emit('LOGIN_SUCCESS', {userInfo});
  sessionStorage.setItem('PREV_LOGIN_DATA', JSON.stringify(resData));
}

function clearPrevLoginData() {
  sessionStorage.clear();
}

function getPrevLoginData() {
  let res = sessionStorage.getItem('PREV_LOGIN_DATA');
  let result = null;
  if(res) {
    try {
      result = JSON.parse(res);
    } catch(e) {
      console.log(e);
    }
  }
  return result;
}

const authActions = store => ({
  async autoLogin() {
    let prevLoginData = getPrevLoginData();
    if(prevLoginData) {
      onLoginSuccess(store, prevLoginData);
    }
  },
  async login(state, form, callback) {
    store.setState({
      logging: true
    });
    let loginRes = await AUTH_APIS.login(form);
    let isLogin = !!loginRes.data && !loginRes.err;
    if(isLogin) {
      Call(callback, form);
      onLoginSuccess(store, form);
    } else {
      store.setState({
        logging: false,
        loginResDesc: loginRes.err
      });
    }
  },
  async logout() {
    store.setState({
      logouting: true,
    });
    await AUTH_APIS.logout();
    store.setState(defaultAuthStore);
    clearPrevLoginData();
  },
});

export {
  authStore, authActions
};
