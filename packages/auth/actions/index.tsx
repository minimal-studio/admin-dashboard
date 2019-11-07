// import createStore from "unistore";
// import { Call } from "@mini-code/base-func";

// import { AUTH_APIS } from "./apis";
// import NAV_MENU_CONFIG from "../../config/nav-config";

// export interface AuthActions {
//   autoLogin: () => void;
//   login: (form, callback) => void;
//   logout: () => void;
// }
// export interface AuthStore {
//   userInfo: {};
//   username: string;
//   loginResDesc: string;
//   autoLoging: boolean;
//   logging: boolean;
//   logouting: boolean;
//   isLogin: boolean;
//   token: string;
// }

// const defaultAuthStore = {
//   userInfo: {},
//   username: "none",
//   loginResDesc: "",
//   logging: false,
//   logouting: false,
//   isLogin: false,
//   sessID: "none",
//   menuStore: NAV_MENU_CONFIG
// };
// const authStore = createStore(defaultAuthStore);

// function onLoginSuccess(store, resData) {
//   const userInfo = resData;
//   const username = resData.AdminName;
//   userInfo.username = username;
//   // let menuStore = (userInfo.Menus || {}).Child;
//   const sessID = resData.SessId;
//   // delete userInfo['Menus'];

//   store.setState({
//     logging: false,
//     isLogin: true,
//     sessID,
//     username,
//     userInfo
//     // menuStore
//   });

//   window.$GH.EventEmitter.emit("LOGIN_SUCCESS", { userInfo });
//   sessionStorage.setItem("PREV_LOGIN_DATA", JSON.stringify(resData));
// }

// function clearPrevLoginData() {
//   sessionStorage.clear();
// }

// function getPrevLoginData() {
//   const res = sessionStorage.getItem("PREV_LOGIN_DATA");
//   let result = null;
//   if (res) {
//     try {
//       result = JSON.parse(res);
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   return result;
// }

// const authActions = store => ({
//   async autoLogin() {
//     const prevLoginData = getPrevLoginData();
//     if (prevLoginData) {
//       onLoginSuccess(store, prevLoginData);
//     }
//   },
//   async login(state, form, callback) {
//     store.setState({
//       logging: true
//     });
//     const loginRes = await AUTH_APIS.login(form);
//     const isLogin = !!loginRes.data && !loginRes.err;
//     if (isLogin) {
//       Call(callback, form);
//       onLoginSuccess(store, form);
//     } else {
//       store.setState({
//         logging: false,
//         loginResDesc: loginRes.err
//       });
//     }
//   },
//   async logout() {
//     store.setState({
//       logouting: true
//     });
//     await AUTH_APIS.logout();
//     store.setState(defaultAuthStore);
//     clearPrevLoginData();
//   }
// });

// export { authStore, authActions };

export * from './store';
