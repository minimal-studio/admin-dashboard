import createStore from 'unistore'
import {$request} from 'orion-request';
import {AUTH_APIS} from './apis';

import NAV_MENU_CONFIG from '../config/nav-config';

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
let authStore = createStore(defaultAuthStore);

function onLoginSuccess(store, resData) {
  let userInfo = resData.AdminUser;
  let username = resData.AdminUser.AdminName;
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

let authActions = store => ({
  async autoLogin() {
    let prevLoginData = getPrevLoginData();
    if(prevLoginData) {
      onLoginSuccess(store, prevLoginData);
    }
  },
  async login(state, form) {
   if (form.AdminName === 'alex' && form.Password === 'qwe123') {
     return {isLogin: true}
   } else {
     return {isLogin: false}
   }
    
    store.setState({
      logging: true
    });
    let loginRes = await AUTH_APIS.login(form);
    let isLogin = loginRes.Header.ErrCode.Code == '0';
    if(isLogin) {
      onLoginSuccess(store, loginRes.Data);
    } else {
      store.setState({
        logging: false,
        loginResDesc: loginRes.Header.ErrCode.Desc
      });
    }
  },
  async logout(state) {
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
}
