/**
 * 这里是根据具体业务的处理filter
 */

import {EventEmitter} from 'basic-helper';
import {$request, PollClass} from 'orion-request';
import {getUserInfo, onLoginFail} from '../login-actions';

import {authStore} from '../login-actions';

function getUserName() {
  return authStore.getState().username;
}
function getSessID() {
  return authStore.getState().sessID;
}

/**
 * 获取全局的请求的 header
 */
function getCommonHeader() {
  let reqHeader = {
    SessId: getSessID(),
    AdminName: getUserName(),
    Platform: window.PLATFORM,
    Device: window.DEVICE,
  };

  window.COMMON_REQ_HEADER = reqHeader;
  return reqHeader;
}

/**
 * 设置 $request 对象的 res
 */
function handleRes({resData, callback}) {
  let errcode = resData.Header.ErrCode;
  switch (errcode.Code) {
    case '30003':
    case '30024':
    case '30039':
      // TODO 处理登录错误的业务
      // onLoginFail(errcode.Desc);
      break;
  }
}

/**
 * $request send data 前的 wrapper 函数
 */
$request.wrapDataBeforeSend = (options) => {
  const {isCompress, method, data, params, Header} = options;
  return {
    Header: Object.assign({}, getCommonHeader(data), {
      Compress: isCompress ? 1 : 0,
      Method: method,
    }, params),
    Data: data
  }
}

/**
 * 当 $request 有相应时，返回
 */
$request.setResDataHook = (resData) => {
  resData.data = resData.Data || {};
  return resData;
}

/**
 * 监听 $request res 处理函数
 */
$request.subscribeRes(handleRes);

/**
 * 轮询对象的设置
 */
const PollingEntity = new PollClass(2);
PollingEntity.setReqObj($request);

export {
  $request, PollingEntity
};
