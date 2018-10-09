import { EventEmitter } from 'basic-helper';
import { setFEDeployConfig } from 'uke-admin-web-scaffold/fe-deploy';
import { initFields } from "../services/fields";

EventEmitter.on('LOGIN_SUCCESS', ({userInfo}) => {
  setFEDeployConfig({
    username: userInfo.username,
    apiUrl: window.F_E_DeploymentUrl
  });
  initFields();
});